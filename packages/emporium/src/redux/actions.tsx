import { customDataTypes, dataTypes, vehicleDataTypes } from '@emporium/data';
import apiClient, {
    userService,
    characterService,
    characterDataService,
    userSettingsService,
    customArchetypesService,
    customArchetypeTalentsService,
    customArmorService,
    customCareersService,
    customGearService,
    customMotivationsService,
    customSettingsService,
    customSkillsService,
    customTalentsService,
    customVehiclesService,
    customWeaponsService,
    vehicleService,
    vehicleDataService
} from '../api/client';
import clone from 'clone';
import { upperFirst } from 'lodash-es';

// TODO: Replace Firebase auth with FeathersJS authentication
export const writeUser = () => {
    return async (dispatch, getState) => {
        const userId = getState().user;

        if (!userId) {
            console.warn('writeUser: No user ID available');
            return;
        }

        try {
            // Check if user exists, create if not
            const users = await userService().find({ query: { id: userId } });

            if (users.total === 0) {
                // Create new user with temp credentials
                await userService().create({
                    id: userId,
                    email: `user${userId}@temp.local`,
                    username: `user${userId}`
                });
            }
        } catch (error) {
            console.error('Error in writeUser:', error);
        }
    };
};

export const changeData = (data, type, merge = true) => {
    return async (dispatch, getState) => {
        const { user, character } = getState();

        try {
            // Use character-data service with upsert
            await characterDataService().create({
                character_id: character,
                data_type: type,
                data: data
            });

            dispatch({ type: `${type}_Changed`, payload: data });
        } catch (error) {
            console.error('Error changing data:', error);
        }
    };
};

export const loadData = () => {
    return async (dispatch, getState) => {
        dispatch({ type: 'loadingData_Changed', payload: true });
        const { user, character } = getState();

        try {
            // Update user settings with last character
            await userSettingsService().create({
                user_id: user,
                last_character_id: character
            });

            // Load all character data
            const response = await characterDataService().find({
                query: { character_id: character }
            });

            // Dispatch each data type
            dataTypes.forEach((type) => {
                const item = response.data.find(d => d.data_type === type);
                const payload = item ? item.data : null;
                dispatch({ type: `${type}_Changed`, payload });
            });

            dispatch({ type: 'loadingData_Changed', payload: false });
        } catch (error) {
            console.error('Error loading data:', error);
            dispatch({ type: 'loadingData_Changed', payload: false });
        }
    };
};

export const loadCharacterList = () => {
    return async (dispatch, getState) => {
        const userId = getState().user;

        try {
            // Load characters for this user
            const response = await characterService().find({
                query: { user_id: userId }
            });

            if (response.data.length === 0) {
                // Create a new character if none exist
                const newChar = await characterService().create({
                    user_id: userId,
                    name: 'New Character',
                    data: {}
                });

                dispatch({
                    type: 'characterList_Changed',
                    payload: { [newChar.id]: newChar.name }
                });
                dispatch({ type: 'character_Changed', payload: newChar.id });
            } else {
                // Convert array to object keyed by ID
                const characterList = response.data.reduce((acc, char) => {
                    acc[char.id] = char.name;
                    return acc;
                }, {});

                dispatch({
                    type: 'characterList_Changed',
                    payload: characterList
                });

                // Load last selected character or first one
                const currentCharacter = getState().character;
                if (!currentCharacter) {
                    try {
                        const settings = await userSettingsService().find({
                            query: { user_id: userId }
                        });

                        const lastCharacterId = settings.data[0]?.last_character_id || response.data[0].id;
                        dispatch({ type: 'character_Changed', payload: lastCharacterId });
                    } catch (error) {
                        dispatch({ type: 'character_Changed', payload: response.data[0].id });
                    }
                }
            }
        } catch (error) {
            console.error('Error loading character list:', error);
        }
    };
};

export const changeUser = state => {
    return { type: 'User_Changed', payload: state };
};

export const changeCharacter = state => {
    return dispatch => {
        dispatch({ type: 'character_Changed', payload: state });
    };
};

export const addCharacter = () => {
    return async (dispatch, getState) => {
        const userId = getState().user;
        dispatch({ type: 'loading_Changed', payload: true });

        try {
            const newChar = await characterService().create({
                user_id: userId,
                name: 'New Character',
                data: {}
            });

            dispatch({ type: 'character_Changed', payload: newChar.id });
            dispatch({ type: 'loading_Changed', payload: false });
        } catch (error) {
            console.error('Error adding character:', error);
            dispatch({ type: 'loading_Changed', payload: false });
        }
    };
};

export const deleteCharacter = () => {
    return async (dispatch, getState) => {
        dispatch({ type: 'loading_Changed', payload: true });
        const userId = getState().user;
        const characterId = getState().character;
        const characterList = { ...getState().characterList };

        try {
            // Delete the character (cascade will delete character_data)
            await characterService().remove(characterId);

            delete characterList[characterId];

            if (Object.keys(characterList).length === 0) {
                // Create a new character if none left
                const newChar = await characterService().create({
                    user_id: userId,
                    name: 'New Character',
                    data: {}
                });

                dispatch({ type: 'character_Changed', payload: newChar.id });
            } else {
                dispatch({
                    type: 'character_Changed',
                    payload: Object.keys(characterList)[0]
                });
            }

            dispatch({ type: 'loading_Changed', payload: false });
        } catch (error) {
            console.error('Error deleting character:', error);
            dispatch({ type: 'loading_Changed', payload: false });
        }
    };
};

export const changeCharacterName = data => {
    return async (dispatch, getState) => {
        const characterId = getState().character;

        try {
            await characterService().patch(characterId, { name: data });
        } catch (error) {
            console.error('Error changing character name:', error);
        }
    };
};

export const changePrintContent = state => {
    return dispatch => {
        dispatch({ type: 'printContent_Changed', payload: state });
    };
};

export const importCharacter = (characterImport, userId) => {
    return async () => {
        try {
            // Create new character
            const newChar = await characterService().create({
                user_id: userId,
                name: characterImport.name,
                data: {}
            });

            // Import all character data
            const dataPromises = Object.keys(characterImport)
                .filter(type => type !== 'name')
                .map(type =>
                    characterDataService().create({
                        character_id: newChar.id,
                        data_type: type,
                        data: characterImport[type]
                    })
                );

            await Promise.all(dataPromises);
        } catch (error) {
            console.error('Error importing character:', error);
        }
    };
};

const customDataTypeToService = {
    customArchetypes: customArchetypesService,
    customArchetypeTalents: customArchetypeTalentsService,
    customArmor: customArmorService,
    customCareers: customCareersService,
    customGear: customGearService,
    customMotivations: customMotivationsService,
    customSettings: customSettingsService,
    customSkills: customSkillsService,
    customTalents: customTalentsService,
    customVehicles: customVehiclesService,
    customWeapons: customWeaponsService
};

export const importCustomData = customDataSetImport => {
    return async (dispatch, getState) => {
        const userId = getState().user;

        for (const [type, data] of Object.entries(customDataSetImport)) {
            const service = customDataTypeToService[type];
            if (!service) continue;

            const dataClone = clone(data);

            try {
                if (type === 'customArchetypes') {
                    // Special handling for archetypes
                    for (const item of Object.values(dataClone)) {
                        const { characteristics, ...obj } = item as any;
                        const final = {
                            user_id: userId,
                            name: item.name || 'none',
                            data: { ...obj, ...characteristics },
                            read_access: [userId],
                            write_access: [userId]
                        };
                        await service().create(final);
                    }
                } else {
                    // Standard handling for other types
                    for (const item of Object.values(dataClone)) {
                        const final = {
                            user_id: userId,
                            name: (item as any).name || 'none',
                            data: item,
                            read_access: [userId],
                            write_access: [userId]
                        };
                        await service().create(final);
                    }
                }
            } catch (error) {
                console.error(`Error importing ${type}:`, error);
            }
        }
    };
};

export const addDataSet = (type, data = {}) => {
    return async (dispatch, getState) => {
        const userId = getState().user;
        const service = customDataTypeToService[type];

        if (!service) {
            console.error(`Unknown custom data type: ${type}`);
            return;
        }

        try {
            const final = {
                user_id: userId,
                name: data.name || 'none',
                data: data,
                read_access: [userId],
                write_access: [userId]
            };

            await service().create(final);
        } catch (error) {
            console.error(`Error adding ${type}:`, error);
        }
    };
};

export const removeDataSet = (type, key) => {
    return async () => {
        try {
            if (type === 'vehicle') {
                // Delete vehicle (cascade will delete vehicle_data)
                await vehicleService().remove(key);
            } else {
                const service = customDataTypeToService[type];
                if (service) {
                    await service().remove(key);
                }
            }
        } catch (error) {
            console.error(`Error removing ${type}:`, error);
        }
    };
};

export const modifyDataSet = (type, { id, ...data }) => {
    return async () => {
        try {
            if (type === 'vehicle') {
                await vehicleService().patch(id, data);
            } else {
                const service = customDataTypeToService[type];
                if (service) {
                    await service().patch(id, data);
                }
            }
        } catch (error) {
            console.error(`Error modifying ${type}:`, error);
        }
    };
};

export const loadDataSets = () => {
    return async (dispatch, getState) => {
        const userId = getState().user;

        try {
            // Load all custom data types
            for (const type of customDataTypes) {
                const service = customDataTypeToService[type];
                if (!service) continue;

                const response = await service().find({
                    query: { readable_by: userId }
                });

                // Convert to object keyed by ID
                const dataSet = response.data.reduce((acc, item) => {
                    acc[item.id] = { ...item.data, id: item.id, name: item.name };
                    return acc;
                }, {});

                dispatch({ type: `${type}_Changed`, payload: dataSet });
            }

            // Load vehicles
            const vehicles = await vehicleService().find({
                query: { user_id: userId }
            });

            const vehicleData = vehicles.data.reduce((acc, item) => {
                acc[item.id] = { ...item.data, id: item.id, name: item.name };
                return acc;
            }, {});

            dispatch({ type: 'vehicle_Changed', payload: vehicleData });
        } catch (error) {
            console.error('Error loading data sets:', error);
        }
    };
};

// Vehicle-specific actions
export const changeReduxState = (data, type) => {
    return { type: `${type}_Changed`, payload: data };
};

export const changeFieldData = (type, key, data, field) => {
    return async () => {
        try {
            if (type === 'vehicle') {
                await vehicleService().patch(key, { [field]: data });
            } else {
                const service = customDataTypeToService[type];
                if (service) {
                    await service().patch(key, { [field]: data });
                }
            }
        } catch (error) {
            console.error(`Error changing field data for ${type}:`, error);
        }
    };
};

export const changeDocData = (type, key, dataType, data) => {
    return async () => {
        try {
            if (type === 'vehicle') {
                await vehicleDataService().create({
                    vehicle_id: key,
                    data_type: dataType,
                    data: data
                });
            }
        } catch (error) {
            console.error(`Error changing doc data for ${type}:`, error);
        }
    };
};

export const loadDoc = (type, key) => {
    return async (dispatch) => {
        try {
            if (type === 'vehicle' && key) {
                const response = await vehicleDataService().find({
                    query: { vehicle_id: key }
                });

                response.data.forEach(item => {
                    dispatch({
                        type: `${item.data_type}_Changed`,
                        payload: item.data
                    });
                });
            }
        } catch (error) {
            console.error(`Error loading doc for ${type}:`, error);
        }
    };
};

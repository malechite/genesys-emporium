import {
    addDataSet,
    importCharacter,
    importCustomData
} from '@emporium/actions';
import { customDataTypes, dataTypes } from '@emporium/data';
import { cloneDeep, pull, startCase } from 'lodash-es';
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardText,
    Col,
    Input,
    Label,
    Row
} from 'reactstrap';
import { db } from '../firestoreDB';

interface ImportExportProps {}

export const ImportExport = ({}: ImportExportProps) => {
    const dispatch = useDispatch() as any;

    // Redux state
    const characterList = useSelector((state: any) => state.characterList);
    const user = useSelector((state: any) => state.user);
    const customArchetypes = useSelector(
        (state: any) => state.customArchetypes
    );
    const customArchetypeTalents = useSelector(
        (state: any) => state.customArchetypeTalents
    );
    const customArmor = useSelector((state: any) => state.customArmor);
    const customCareers = useSelector((state: any) => state.customCareers);
    const customGear = useSelector((state: any) => state.customGear);
    const customMotivations = useSelector(
        (state: any) => state.customMotivations
    );
    const customSettings = useSelector((state: any) => state.customSettings);
    const customSkills = useSelector((state: any) => state.customSkills);
    const customTalents = useSelector((state: any) => state.customTalents);
    const customVehicles = useSelector((state: any) => state.customVehicles);
    const customWeapons = useSelector((state: any) => state.customWeapons);

    // Local state
    const [state, setState] = useState({
        characters: [],
        customArchetypes: [],
        customArchetypeTalents: [],
        customArmor: [],
        customCareers: [],
        customGear: [],
        customMotivations: [],
        customSettings: [],
        customSkills: [],
        customTalents: [],
        customVehicles: [],
        customWeapons: []
    });

    const initState = useCallback(() => {
        setState({
            characters: [],
            customArchetypes: [],
            customArchetypeTalents: [],
            customArmor: [],
            customCareers: [],
            customGear: [],
            customMotivations: [],
            customSettings: [],
            customSkills: [],
            customTalents: [],
            customVehicles: [],
            customWeapons: []
        });
    }, []);

    const generateFileName = useCallback(() => {
        const time = new Date(Date.now())
            .toLocaleString()
            .replace(/[\s+]/g, '')
            .replace(/[\D+]/g, '_')
            .slice(0, -2);
        return `GenesysEmporiumExport_${time}.json`;
    }, []);

    const generateExport = useCallback(async () => {
        const final: any = {};
        const props = {
            customArchetypes,
            customArchetypeTalents,
            customArmor,
            customCareers,
            customGear,
            customMotivations,
            customSettings,
            customSkills,
            customTalents,
            customVehicles,
            customWeapons
        };

        Promise.all(
            Object.keys(state).map(async type => {
                if (0 >= state[type].length) {
                    return;
                }
                return new Promise(resolve0 => {
                    switch (type) {
                        case 'characters':
                            const characters = state[type].map(
                                async character => {
                                    return new Promise(async resolve1 => {
                                        const file = {
                                            name: characterList[character]
                                        };
                                        Promise.all(
                                            dataTypes.map(async type => {
                                                return new Promise(
                                                    async resolve2 => {
                                                        db.doc(
                                                            `users/${user}/data/characters/${character}/${type}/`
                                                        )
                                                            .get()
                                                            .then(doc => {
                                                                if (
                                                                    doc.exists
                                                                ) {
                                                                    file[
                                                                        type
                                                                    ] = cloneDeep(
                                                                        doc.data()
                                                                            .data
                                                                    );
                                                                }
                                                                resolve2();
                                                            });
                                                    }
                                                );
                                            })
                                        ).then(() => resolve1(file));
                                    });
                                }
                            );
                            Promise.all(characters).then(characters => {
                                final.characters = characters;
                                resolve0();
                            });
                            break;
                        default:
                            final[type] = state[type].map(key => {
                                // noinspection JSUnusedLocalSymbols
                                const { read, write, ...item } = props[type][
                                    key
                                ];
                                return item;
                            });
                            resolve0();
                            break;
                    }
                });
            })
        ).then(() => {
            const element = document.createElement('a');
            const file = new Blob([JSON.stringify(final)], {
                type: 'application/json'
            });
            element.href = URL.createObjectURL(file);
            element.download = generateFileName();
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            initState();
        });
    }, [
        state,
        characterList,
        user,
        customArchetypes,
        customArchetypeTalents,
        customArmor,
        customCareers,
        customGear,
        customMotivations,
        customSettings,
        customSkills,
        customTalents,
        customVehicles,
        customWeapons,
        generateFileName,
        initState
    ]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const name = event.target.name;
            const value = event.target.value;
            const props = {
                customArchetypes,
                customArchetypeTalents,
                customArmor,
                customCareers,
                customGear,
                customMotivations,
                customSettings,
                customSkills,
                customTalents,
                customVehicles,
                customWeapons
            };

            if (name === 'characters') {
                let arr = [];
                if (value === 'all') {
                    if (
                        state.characters.length ===
                        Object.keys(characterList).length
                    ) {
                        arr = [];
                    } else {
                        arr = Object.keys(characterList);
                    }
                } else {
                    arr = cloneDeep(state.characters);
                    if (arr.includes(value)) {
                        arr.splice(arr.indexOf(value), 1);
                    } else {
                        arr.push(value);
                    }
                }
                setState({ ...state, characters: arr });
            } else {
                const key = event.target.id;
                switch (true) {
                    case value === 'all':
                        if (
                            customDataTypes.every(type =>
                                Object.keys(props[type]).every(key =>
                                    state[type].includes(key)
                                )
                            )
                        ) {
                            const newState = { ...state };
                            customDataTypes.forEach(
                                type => (newState[type] = [])
                            );
                            setState(newState);
                        } else {
                            const newState = { ...state };
                            customDataTypes.forEach(
                                type =>
                                    props[type] &&
                                    (newState[type] = Object.keys(props[type]))
                            );
                            setState(newState);
                        }
                        break;
                    case customDataTypes.includes(value) && !key:
                        if (
                            Object.keys(props[value]).every(key =>
                                state[value].includes(key)
                            )
                        ) {
                            setState({ ...state, [value]: [] });
                        } else {
                            setState({
                                ...state,
                                [value]: Object.keys(props[value])
                            });
                        }
                        break;
                    default:
                        let data = [...state[value]];
                        if (state[value].includes(key)) {
                            data = pull(data, key);
                        } else {
                            data.push(key);
                        }
                        setState({ ...state, [value]: data });
                }
            }
        },
        [
            state,
            characterList,
            customArchetypes,
            customArchetypeTalents,
            customArmor,
            customCareers,
            customGear,
            customMotivations,
            customSettings,
            customSkills,
            customTalents,
            customVehicles,
            customWeapons
        ]
    );

    const handleFile = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const fileInput = event.target.files[0];
            const reader = new FileReader();
            reader.onload = event => {
                const file = JSON.parse(event.target.result.toString());
                const props = {
                    customArchetypes,
                    customArchetypeTalents,
                    customArmor,
                    customCareers,
                    customGear,
                    customMotivations,
                    customSettings,
                    customSkills,
                    customTalents,
                    customVehicles,
                    customWeapons
                };

                //old exports Delete at some point
                if (Array.isArray(file)) {
                    file.forEach(data => {
                        switch (Object.keys(data)[0]) {
                            case 'character':
                                dispatch(importCharacter(data.character, user));
                                alert(`${data.character.name} Imported!`);
                                break;
                            case 'customData':
                                dispatch(importCustomData(data.customData));
                                alert(`Custom Data Imported!`);
                                break;
                            default:
                                alert('No Data Imported.');
                                break;
                        }
                    });
                }
                //New exports
                else {
                    let text = '';
                    Object.keys(file).forEach(type => {
                        switch (type) {
                            case 'characters':
                                file[type].forEach(character => {
                                    dispatch(importCharacter(character, user));
                                    text += `${character.name} Imported!\n`;
                                });
                                break;
                            case 'customMotivations':
                            case 'customArchetypeTalents':
                            case 'customArchetypes':
                            case 'customArmor':
                            case 'customCareers':
                            case 'customGear':
                            case 'customSkills':
                            case 'customTalents':
                            case 'customVehicles':
                            case 'customWeapons':
                                file[type].forEach(data => {
                                    if (
                                        Object.keys(props[type]).some(
                                            id => id === data.id
                                        )
                                    ) {
                                        text += `${data.name}(${data.id}) not imported, already exists in database.\n`;
                                    } else {
                                        dispatch(addDataSet(type, data));
                                        text += `${startCase(
                                            type
                                        )} Data Imported.\n`;
                                    }
                                });
                                break;
                            default:
                                text += `No ${startCase(
                                    type
                                )} Data Imported.\n`;
                                break;
                        }
                    });
                    alert(text);
                }
            };
            reader.onerror = () => alert('Bad File');
            reader.readAsText(fileInput);
        },
        [
            dispatch,
            user,
            customArchetypes,
            customArchetypeTalents,
            customArmor,
            customCareers,
            customGear,
            customMotivations,
            customSettings,
            customSkills,
            customTalents,
            customVehicles,
            customWeapons
        ]
    );

    const props = {
        customArchetypes,
        customArchetypeTalents,
        customArmor,
        customCareers,
        customGear,
        customMotivations,
        customSettings,
        customSkills,
        customTalents,
        customVehicles,
        customWeapons
    };

    return (
        <div className="align-self-end align-self-middle">
            <Row>
                <Button className="m-2 align-middle" onClick={generateExport}>
                    Export Selected{' '}
                </Button>{' '}
                <Label
                    for="import"
                    className="btn-secondary py-2 px-3 m-2 align-middle rounded"
                >
                    Import File
                </Label>
                <Input
                    type="file"
                    accept=".json"
                    onChange={handleFile}
                    id="import"
                    hidden
                />
            </Row>
            <div>
                <Row>
                    <Input
                        type="checkbox"
                        value="all"
                        name={'characters'}
                        checked={
                            state.characters.length ===
                            Object.keys(characterList).length
                        }
                        onChange={handleChange}
                    />{' '}
                    <h5 className="my-auto">All Characters</h5>
                </Row>
                <Row>
                    {Object.keys(characterList)
                        .sort()
                        .map(item => (
                            <Col md="4" key={item}>
                                <Card className="m-2 w-100">
                                    <CardHeader>
                                        <CardText className="ml-2">
                                            <Input
                                                type="checkbox"
                                                checked={state.characters.includes(
                                                    item
                                                )}
                                                value={item}
                                                name={'characters'}
                                                onChange={handleChange}
                                            />{' '}
                                            <strong>
                                                {characterList[item]}
                                            </strong>
                                        </CardText>
                                    </CardHeader>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </div>
            <div>
                <Row>
                    <Input
                        type="checkbox"
                        value="all"
                        name={'customData'}
                        checked={customDataTypes.every(
                            type =>
                                state[type].length ===
                                (props[type]
                                    ? Object.keys(props[type]).length
                                    : 0)
                        )}
                        onChange={handleChange}
                    />{' '}
                    <h5 className="my-auto">All Custom Data</h5>
                </Row>
                <Row>
                    {customDataTypes.sort().map(
                        type =>
                            props[type] && (
                                <Col md="4" key={type} className="my-1">
                                    <Card className="m-2 w-100 h-100">
                                        <CardHeader>
                                            <CardText className="ml-2">
                                                <Input
                                                    type="checkbox"
                                                    checked={
                                                        state[type].length >
                                                            0 &&
                                                        Object.keys(
                                                            props[type]
                                                        ).every(key =>
                                                            state[
                                                                type
                                                            ].includes(key)
                                                        )
                                                    }
                                                    value={type}
                                                    onChange={handleChange}
                                                />{' '}
                                                <strong>{type}</strong>
                                            </CardText>
                                        </CardHeader>
                                        <CardBody
                                            key={type}
                                            className="py-2 ml-4"
                                        >
                                            {Object.keys(props[type])
                                                .sort()
                                                .map(key => (
                                                    <CardText key={key}>
                                                        <Input
                                                            type="checkbox"
                                                            checked={state[
                                                                type
                                                            ].includes(key)}
                                                            id={key}
                                                            value={type}
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />{' '}
                                                        {props[type][key].name
                                                            ? props[type][key]
                                                                  .name
                                                            : key}
                                                    </CardText>
                                                ))}
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                    )}
                </Row>
            </div>
        </div>
    );
};

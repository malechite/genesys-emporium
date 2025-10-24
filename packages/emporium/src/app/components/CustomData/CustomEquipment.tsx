import { addDataSet, modifyDataSet, removeDataSet } from '@emporium/actions';
import { chars, diceNames, modifiableAttributes } from '@emporium/data-lists';
import { ControlButtonSet, DeleteButton } from '@emporium/ui';
import clone from 'clone';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Col, Row, Table } from 'reactstrap';
import { Fragment } from './Fragments';

interface CustomEquipmentProps {
    type: string;
    handleClose: () => void;
}

const initialState = {
    name: '',
    damage: '',
    range: '',
    skill: 'All',
    critical: '',
    encumbrance: '',
    price: '',
    soak: '',
    defense: '',
    setting: [],
    meleeDefense: '',
    rangedDefense: '',
    qualityRank: '',
    description: '',
    specialQualities: '',
    strainThreshold: 0,
    qualityList: {},
    modifier: false,
    modifierValue: '',
    mode: 'add'
};

export const CustomEquipment = ({ type, handleClose }: CustomEquipmentProps) => {
    const dispatch = useDispatch() as any;
    const skills = useSelector((state: any) => state.skills);
    const qualities = useSelector((state: any) => state.qualities);
    const customWeapons = useSelector((state: any) => state.customWeapons);
    const customGear = useSelector((state: any) => state.customGear);
    const customArmor = useSelector((state: any) => state.customArmor);

    const [state, setState] = useState<any>(initialState);

    const {
        modifier,
        modifierValue,
        specialQualities,
        qualityList,
        qualityRank,
        strainThreshold
    } = state;

    const initState = useCallback(() => {
        setState(initialState);
    }, []);

    const handleCloseWrapper = useCallback(() => {
        initState();
        handleClose();
    }, [initState, handleClose]);

    const handleChange = useCallback((event: any) => {
        setState((prev: any) => ({ ...prev, [event.target.name]: event.target.value }));
        event.preventDefault();
    }, []);

    const handleAddQuality = useCallback(() => {
        const data = {
            ...clone(state.qualityList),
            [state.specialQualities]: state.qualityRank
                ? +state.qualityRank
                : ''
        };

        setState((prev: any) => ({
            ...prev,
            qualityList: data,
            specialQualities: '',
            qualityRank: ''
        }));
    }, [state.qualityList, state.specialQualities, state.qualityRank]);

    const handleSubmit = useCallback(() => {
        const {
            range,
            damage,
            skill,
            critical,
            soak,
            defense,
            meleeDefense,
            rangedDefense,
            qualityList: qualities,
            modifierValue,
            modifier: mod,
            mode,
            qualityRank,
            specialQualities,
            strainThreshold,
            ...rest
        } = state;

        console.log('Mod:', mod);

        const radix = 10;
        let strainThresholdModified = parseInt(strainThreshold, radix);
        if (!strainThresholdModified || isNaN(strainThresholdModified)) {
            strainThresholdModified = 0;
        }

        if (mod === 'strainThreshold') {
            strainThresholdModified += modifierValue;
        }

        const modifier = mod ? { [mod]: modifierValue, strainThreshold: strainThresholdModified } : {};
        let data;

        if (type === 'customWeapons') {
            data = {
                ...rest,
                damage,
                range,
                skill,
                critical,
                modifier,
                qualities
            };
        }

        if (type === 'customArmor') {
            data = {
                ...rest,
                soak,
                defense,
                meleeDefense,
                rangedDefense,
                modifier,
                qualities
            };
        }

        if (type === 'customGear') {
            data = { ...rest, modifier, qualities };
        }

        if (mode === 'add') {
            dispatch(addDataSet(type, data));
        } else if (mode === 'edit') {
            dispatch(modifyDataSet(type, data));
        }

        initState();
    }, [state, type, dispatch, initState]);

    const handleDuplicate = useCallback((event: any) => {
        const equipmentType = event.target.getAttribute('type');
        const equipment = { customWeapons, customGear, customArmor }[equipmentType];
        const { id, ...data } = { ...equipment[event.target.name] };
        dispatch(addDataSet(equipmentType, { ...data, name: `${data.name} (copy)` }));
        event.preventDefault();
    }, [customWeapons, customGear, customArmor, dispatch]);

    const handleDelete = useCallback((event: any) => {
        const equipmentType = event.target.getAttribute('type');
        const equipment = { customWeapons, customGear, customArmor }[equipmentType];
        dispatch(removeDataSet(equipmentType, equipment[event.target.name].id));
        event.preventDefault();
    }, [customWeapons, customGear, customArmor, dispatch]);

    const handleEdit = useCallback((event: any) => {
        event.preventDefault();
        const equipmentType = event.target.getAttribute('type');
        const equipmentMap = { customWeapons, customGear, customArmor };
        const equipment = equipmentMap[equipmentType][event.target.name];

        setState({
            ...equipment,
            setting:
                typeof equipment.setting === 'string'
                    ? equipment.setting.split(', ')
                    : equipment.setting,
            qualityList: equipment.qualities ? equipment.qualities : {},
            specialQualities: '',
            qualityRank: '',
            mode: 'edit',
            modifier: equipment.modifier
                ? Object.keys(equipment.modifier)[0]
                : false,
            modifierValue: equipment.modifier
                ? Object.values(equipment.modifier)[0]
                : ''
        });
    }, [customWeapons, customGear, customArmor]);

    const handleList = useCallback((event: any) => {
        setState((prev: any) => {
            const { modifierValue } = prev;
            const arr = Array.isArray(modifierValue)
                ? [...modifierValue, event.target.value]
                : [event.target.value];

            return { ...prev, modifierValue: arr };
        });
        event.preventDefault();
    }, []);

    const buildField = useCallback((field: string) => {
        switch (field) {
            case 'name':
                return (
                    <Fragment
                        key={field}
                        type="text"
                        title="name"
                        value={state[field]}
                        mode={state.mode}
                        handleChange={event =>
                            setState((prev: any) => ({ ...prev, name: event.target.value }))
                        }
                    />
                );
            case 'damage':
                return (
                    <Fragment
                        key={field}
                        type="text"
                        value={state[field]}
                        title={field}
                        handleChange={event =>
                            setState((prev: any) => ({ ...prev, [field]: event.target.value }))
                        }
                    />
                );
            case 'setting':
                return (
                    <Fragment
                        key={field}
                        type="setting"
                        setting={state.setting}
                        setState={selected =>
                            setState((prev: any) => ({ ...prev, setting: selected }))
                        }
                    />
                );
            case 'critical':
            case 'encumbrance':
            case 'price':
            case 'soak':
            case 'defense':
            case 'rangedDefense':
            case 'meleeDefense':
                return (
                    <Fragment
                        key={field}
                        type="number"
                        value={state[field]}
                        title={field}
                        handleChange={event =>
                            setState((prev: any) => ({ ...prev, [field]: +event.target.value }))
                        }
                    />
                );
            case 'range':
                return (
                    <Fragment
                        key={field}
                        type="inputSelect"
                        name={field}
                        value={state[field]}
                        array={[
                            'Engaged',
                            'Short',
                            'Medium',
                            'Long',
                            'Extreme'
                        ]}
                        handleChange={event =>
                            setState((prev: any) => ({ ...prev, [field]: event.target.value }))
                        }
                    />
                );
            case 'skill':
                return (
                    <Fragment
                        key={field}
                        type="inputSelect"
                        name={field}
                        value={state[field]}
                        array={Object.keys(skills).filter(
                            skill => skills[skill].type === 'Combat'
                        )}
                        nameObj={skills}
                        handleChange={event =>
                            setState((prev: any) => ({ ...prev, [field]: event.target.value }))
                        }
                    />
                );
            case 'specialQualities':
                return (
                    <div key={field}>
                        <Fragment
                            type="inputSelect"
                            title="specialQualities"
                            value={specialQualities}
                            array={Object.keys(qualities).filter(quality =>
                                qualities[quality].type.includes(
                                    type.toLowerCase().slice(6)
                                )
                            )}
                            nameObj={qualities}
                            handleChange={event =>
                                setState((prev: any) => ({
                                    ...prev,
                                    specialQualities: event.target.value,
                                    qualityRank: ''
                                }))
                            }
                        />

                        {specialQualities && (
                            <div>
                                {qualities[specialQualities] &&
                                    qualities[specialQualities].ranked && (
                                        <Fragment
                                            type="number"
                                            value={qualityRank}
                                            title={'qualityRank'}
                                            handleChange={event =>
                                                setState((prev: any) => ({
                                                    ...prev,
                                                    qualityRank:
                                                        event.target.value
                                                }))
                                            }
                                        />
                                    )}

                                <Row>
                                    <Col sm="2" className="my-auto" />
                                    <Col className="text-left">
                                        <Button onClick={handleAddQuality}>
                                            Add Quality
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        )}

                        {Object.keys(qualityList).length > 0 && (
                            <Fragment
                                type="list"
                                title="Qualities List"
                                array={Object.keys(qualityList)}
                                object={qualityList}
                                nameObj={qualities}
                                handleClear={() =>
                                    setState((prev: any) => ({ ...prev, qualityList: {} }))
                                }
                            />
                        )}
                    </div>
                );
            case 'description':
                return (
                    <Fragment
                        key={field}
                        type="description"
                        value={state.description}
                        handleChange={event =>
                            setState((prev: any) => ({ ...prev, description: event.target.value }))
                        }
                    />
                );
            case 'modifier':
                return (
                    <div key={field}>
                        <Fragment
                            type="inputSelect"
                            title="modifier"
                            array={[true, false]}
                            nameObj={{
                                true: { name: 'Yes' },
                                false: { name: 'No' }
                            }}
                            value={Boolean(modifier)}
                            blankOption={false}
                            handleChange={event =>
                                setState((prev: any) => ({
                                    ...prev,
                                    modifier: JSON.parse(event.target.value),
                                    modifierValue: ''
                                }))
                            }
                        />

                        {modifier && (
                            <Fragment
                                type="inputSelect"
                                title="Attribute"
                                value={modifier}
                                array={Object.keys(skills)
                                    .concat(modifiableAttributes, chars)
                                    .sort()}
                                nameObj={skills}
                                handleChange={event =>
                                    setState((prev: any) => ({
                                        ...prev,
                                        modifier: event.target.value,
                                        modifierValue: 1
                                    }))
                                }
                            />
                        )}

                        {modifier === 'careerSkills' && (
                            <Fragment
                                type="inputSelect"
                                title="modifierValue"
                                value=""
                                array={Object.keys(skills).filter(skill =>
                                    Array.isArray(modifierValue)
                                        ? !modifierValue.includes(skill)
                                        : true
                                )}
                                nameObj={skills}
                                handleChange={handleList}
                            />
                        )}

                        {modifiableAttributes.includes(modifier) &&
                            modifier !== 'careerSkills' && (
                                <Fragment
                                    type="number"
                                    value={modifierValue}
                                    title="modifierValue"
                                    handleChange={event =>
                                        setState((prev: any) => ({
                                            ...prev,
                                            modifierValue: +event.target.value
                                        }))
                                    }
                                />
                            )}

                        {Array.isArray(modifierValue) && (
                            <Fragment
                                type="list"
                                title="modifierList"
                                array={modifierValue}
                                nameObj={{ ...skills, diceNames }}
                                handleClear={() =>
                                    setState((prev: any) => ({ ...prev, modifierValue: [] }))
                                }
                            />
                        )}

                        <Fragment
                            type="numberSelect"
                            title="Strain Threshold Modifier"
                            array={[0, -1]}
                            value={strainThreshold}
                            handleChange={event =>
                                setState((prev: any) => ({
                                    ...prev,
                                    strainThreshold: event.target.value
                                }))
                            }
                        />

                        {Object.keys(skills).includes(modifier) && (
                            <Fragment
                                type="inputSelect"
                                title="modifierValue"
                                value=""
                                nameObj={diceNames}
                                array={[
                                    '[blue]',
                                    '[black]',
                                    '[rmblack]',
                                    '[success]',
                                    '[advantage]',
                                    '[failure]',
                                    '[threat]',
                                    '1 Free Rank',
                                    '2 Free Ranks',
                                    '3 Free Ranks',
                                    '4 Free Ranks',
                                    '5 Free Ranks'
                                ]}
                                handleChange={handleList}
                            />
                        )}
                    </div>
                );
            default:
                return <div />;
        }
    }, [state, skills, qualities, type, specialQualities, qualityList, qualityRank, modifier, modifierValue, strainThreshold, handleAddQuality, handleList]);

    const getFields = useCallback((type: string) => {
        switch (type) {
            case 'customWeapons':
                return [
                    'name',
                    'damage',
                    'critical',
                    'range',
                    'skill',
                    'encumbrance',
                    'price',
                    'description',
                    'setting',
                    'modifier'
                ];
            case 'customArmor':
                return [
                    'name',
                    'soak',
                    'defense',
                    'rangedDefense',
                    'meleeDefense',
                    'encumbrance',
                    'price',
                    'description',
                    'setting',
                    'modifier'
                ];
            case 'customGear':
                return [
                    'name',
                    'encumbrance',
                    'price',
                    'description',
                    'setting',
                    'modifier'
                ];
            default:
                return [];
        }
    }, []);

    const currentEquipment = useMemo(() => {
        return { customWeapons, customGear, customArmor }[type] || {};
    }, [type, customWeapons, customGear, customArmor]);

    return (
        <div>
            {getFields(type).map(field => buildField(field))}
            {buildField('specialQualities')}
            <ControlButtonSet
                mode={state.mode}
                type={type.replace('custom', '')}
                handleSubmit={handleSubmit}
                onEditSubmit={handleSubmit}
                onEditCancel={initState}
            />
            <Table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {type &&
                        Object.keys(currentEquipment)
                            .sort((a, b) =>
                                currentEquipment[a].name >
                                currentEquipment[b].name
                                    ? 1
                                    : -1
                            )
                            .map(key => (
                                <tr key={key}>
                                    <td>{currentEquipment[key].name}</td>
                                    <td className="text-right">
                                        <ButtonGroup>
                                            <Button
                                                name={key}
                                                type={type}
                                                onClick={handleEdit}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                name={key}
                                                type={type}
                                                onClick={
                                                    handleDuplicate
                                                }
                                            >
                                                Duplicate
                                            </Button>
                                            <DeleteButton
                                                name={key}
                                                type={type}
                                                onClick={handleDelete}
                                            />
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            ))}
                </tbody>
            </Table>
        </div>
    );
};

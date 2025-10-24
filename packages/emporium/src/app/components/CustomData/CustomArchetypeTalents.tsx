import { addDataSet, modifyDataSet, removeDataSet } from '@emporium/actions';
import { diceNames, modifiableAttributes } from '@emporium/data-lists';
import { ControlButtonSet, DeleteButton } from '../';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { Fragment } from './Fragments';

interface CustomArchetypeTalentsProps {
    handleClose?: () => void;
}

const initialState = {
    name: '',
    activation: '',
    turn: '',
    description: '',
    setting: [],
    modifier: false,
    modifierValue: '',
    mode: 'add'
};

export const CustomArchetypeTalents = ({ handleClose }: CustomArchetypeTalentsProps) => {
    const dispatch = useDispatch() as any;
    const customArchetypeTalents = useSelector((state: any) => state.customArchetypeTalents);
    const skills = useSelector((state: any) => state.skills);

    const [state, setState] = useState<any>(initialState);

    const {
        name,
        tier,
        ranked,
        activation,
        turn,
        description,
        setting,
        modifier,
        modifierValue,
        mode
    } = state;

    const initState = useCallback(() => {
        setState(initialState);
    }, []);

    const handleList = useCallback((event: any) => {
        setState((prev: any) => {
            const { modifierValue } = prev;
            let arr = [];
            if (Array.isArray(modifierValue)) {
                arr = [...modifierValue];
            }
            arr.push(event.target.value);
            return { ...prev, modifierValue: arr };
        });
        event.preventDefault();
    }, []);

    const handleSubmit = useCallback(() => {
        const { modifier, modifierValue, mode, ...rest } = state;
        const data = { ...rest };
        if (modifier) {
            data.modifier = { [modifier]: modifierValue };
        }
        if (mode === 'add') {
            dispatch(addDataSet('customArchetypeTalents', data));
        } else if (mode === 'edit') {
            dispatch(modifyDataSet('customArchetypeTalents', data));
        }
        initState();
    }, [state, dispatch, initState]);

    const handleDuplicate = useCallback((event: any) => {
        const { id, ...data } = {
            ...customArchetypeTalents[event.target.name]
        };
        dispatch(addDataSet('customArchetypeTalents', {
            ...data,
            name: `${data.name} (copy)`
        }));
        event.preventDefault();
    }, [customArchetypeTalents, dispatch]);

    const handleDelete = useCallback((event: any) => {
        dispatch(removeDataSet(
            'customArchetypeTalents',
            customArchetypeTalents[event.target.name].id
        ));
        event.preventDefault();
    }, [customArchetypeTalents, dispatch]);

    const handleCloseWrapper = useCallback(() => {
        initState();
        handleClose();
    }, [initState, handleClose]);

    const handleEdit = useCallback((event: any) => {
        const talent = customArchetypeTalents[event.target.name];
        setState({
            setting:
                typeof talent.setting === 'string'
                    ? talent.setting.split(', ')
                    : talent.setting,
            modifier: talent.modifier ? Object.keys(talent.modifier)[0] : false,
            modifierValue: talent.modifier
                ? Object.values(talent.modifier)[0]
                : '',
            mode: 'edit',
            ...talent
        });
    }, [customArchetypeTalents]);

    return (
        <div>
            <Fragment
                type="text"
                title="name"
                value={name}
                mode={mode}
                handleChange={event =>
                    setState((prev: any) => ({ ...prev, name: event.target.value }))
                }
            />

            <Fragment
                type="setting"
                setting={setting}
                setState={selected => setState((prev: any) => ({ ...prev, setting: selected }))}
            />

            <Fragment
                type="inputSelect"
                title="activation"
                array={[true, false]}
                nameObj={{
                    true: { name: 'Active' },
                    false: { name: 'Passive' }
                }}
                value={activation}
                handleChange={event =>
                    setState((prev: any) => ({
                        ...prev,
                        activation: JSON.parse(event.target.value)
                    }))
                }
            />

            {activation && (
                <Fragment
                    type="text"
                    title="turn"
                    value={turn}
                    handleChange={event =>
                        setState((prev: any) => ({ ...prev, turn: event.target.value }))
                    }
                />
            )}

            <Fragment
                type="description"
                value={description}
                handleChange={event =>
                    setState((prev: any) => ({ ...prev, description: event.target.value }))
                }
            />

            <Fragment
                type="inputSelect"
                title="modifier"
                array={[true, false]}
                nameObj={{ true: { name: 'Yes' }, false: { name: 'No' } }}
                value={modifier}
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
                    array={[
                        'careerSkills',
                        'defense',
                        'meleeDefense',
                        'strainThreshold',
                        'soak',
                        'rangedDefense',
                        'woundThreshold'
                    ].concat(Object.keys(skills))}
                    nameObj={skills}
                    handleChange={event =>
                        setState((prev: any) => ({
                            ...prev,
                            modifier: event.target.value,
                            modifierValue: ''
                        }))
                    }
                />
            )}

            {(modifiableAttributes.includes(modifier) ||
                Object.keys(skills).includes(modifier)) &&
                (modifier === 'careerSkills' ? (
                    <Fragment
                        type="inputSelect"
                        title="modifierValue"
                        value=""
                        array={Object.keys(skills).filter(
                            skill => !modifierValue.includes(skill)
                        )}
                        nameObj={skills}
                        handleChange={handleList}
                    />
                ) : modifiableAttributes.includes(modifier) ? (
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
                ) : (
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
                            '[threat]'
                        ]}
                        handleChange={handleList}
                    />
                ))}

            {Array.isArray(modifierValue) && (
                <Fragment
                    type="list"
                    title="modifierList"
                    array={modifierValue}
                    nameObj={{ ...skills, diceNames }}
                    handleClear={() => setState((prev: any) => ({ ...prev, modifierValue: [] }))}
                />
            )}
            <hr />
            <ControlButtonSet
                mode={mode}
                type={'Archetype Talents'}
                handleSubmit={handleSubmit}
                onEditSubmit={handleSubmit}
                onEditCancel={initState}
                disabled={
                    name === '' ||
                    tier === '' ||
                    ranked === '' ||
                    activation === ''
                }
            />

            <Table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {customArchetypeTalents &&
                        Object.keys(customArchetypeTalents)
                            .sort((a, b) =>
                                customArchetypeTalents[a].name >
                                customArchetypeTalents[b].name
                                    ? 1
                                    : -1
                            )
                            .map(key => (
                                <tr key={key}>
                                    <td>
                                        {customArchetypeTalents[key].name}
                                    </td>
                                    <td>
                                        <ButtonGroup>
                                            <Button
                                                name={key}
                                                onClick={handleEdit}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                name={key}
                                                onClick={
                                                    handleDuplicate
                                                }
                                            >
                                                Duplicate
                                            </Button>
                                            <DeleteButton
                                                name={key}
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

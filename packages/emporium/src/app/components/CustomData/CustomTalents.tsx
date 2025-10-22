import { addDataSet, modifyDataSet, removeDataSet } from '@emporium/actions';
import { chars, diceNames, modifiableAttributes } from '@emporium/data-lists';
import { ControlButtonSet, DeleteButton } from '@emporium/ui';
import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { Fragment } from './Fragments';

interface CustomTalentsProps {
    handleClose?: () => void;
}

export const CustomTalents = ({ handleClose }: CustomTalentsProps) => {
    const dispatch = useDispatch();
    const customTalents = useSelector((state: any) => state.customTalents);
    const talents = useSelector((state: any) => state.talents);
    const skills = useSelector((state: any) => state.skills);

    const [name, setName] = useState('');
    const [tier, setTier] = useState<number | string>('');
    const [activation, setActivation] = useState<boolean | string>('');
    const [turn, setTurn] = useState('');
    const [ranked, setRanked] = useState<boolean | string>('');
    const [description, setDescription] = useState('');
    const [setting, setSetting] = useState<any[]>([]);
    const [modifier, setModifier] = useState<string | boolean>(false);
    const [modifierValue, setModifierValue] = useState<string | number | any[]>('');
    const [prerequisite, setPrerequisite] = useState('');
    const [antirequisite, setAntirequisite] = useState('');
    const [mode, setMode] = useState('add');

    const _type = 'customTalents';

    const initState = useCallback(() => {
        setName('');
        setTier('');
        setActivation('');
        setTurn('');
        setRanked('');
        setDescription('');
        setSetting([]);
        setModifier(false);
        setModifierValue('');
        setPrerequisite('');
        setAntirequisite('');
        setMode('add');
    }, []);

    const handleList = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setModifierValue(prev => {
            const arr = Array.isArray(prev) ? [...prev] : [];
            arr.push(event.target.value);
            return arr;
        });
        event.preventDefault();
    }, []);

    const handleDuplicate = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const { id = '', ...data } = { ...customTalents[event.currentTarget.name] };
        dispatch(addDataSet(_type, {
            ...data,
            name: `${data.name} (copy)`
        }));
        event.preventDefault();
    }, [customTalents, dispatch]);

    const handleSubmit = useCallback(() => {
        const data: any = { name, tier, activation, turn, ranked, description, setting, prerequisite, antirequisite };
        if (modifier) {
            data.modifier = { [modifier as string]: modifierValue };
        }
        if (mode === 'add') {
            dispatch(addDataSet(_type, data));
        } else if (mode === 'edit') {
            dispatch(modifyDataSet(_type, data));
        }
        initState();
    }, [name, tier, activation, turn, ranked, description, setting, modifier, modifierValue, prerequisite, antirequisite, mode, dispatch, initState]);

    const handleDelete = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(removeDataSet(
            _type,
            customTalents[event.currentTarget.name].id
        ));
        event.preventDefault();
    }, [customTalents, dispatch]);

    const handleCloseModal = useCallback(() => {
        initState();
        handleClose?.();
    }, [initState, handleClose]);

    const handleEdit = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const talent = customTalents[event.currentTarget.name];
        setName(talent.name);
        setTier(talent.tier);
        setActivation(talent.activation ? talent.activation : false);
        setTurn(talent.turn);
        setRanked(talent.ranked ? talent.ranked : false);
        setDescription(talent.description);
        setSetting(typeof talent.setting === 'string'
            ? talent.setting.split(', ')
            : talent.setting);
        setModifier(talent.modifier ? Object.keys(talent.modifier)[0] : false);
        setModifierValue(talent.modifier
            ? Object.values(talent.modifier)[0] as any
            : '');
        setPrerequisite(talent.prerequisite);
        setAntirequisite(talent.antirequisite);
        setMode('edit');
    }, [customTalents]);

    return (
        <div>
            <Fragment
                type="text"
                title="Name"
                value={name}
                mode={mode}
                handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setName(event.target.value)
                }
            />

            <Fragment
                type="setting"
                setting={setting}
                setState={(selected: any[]) => setSetting(selected)}
            />

            <Fragment
                type="inputSelect"
                title="tier"
                array={[1, 2, 3, 4, 5]}
                value={tier}
                handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setTier(+event.target.value)
                }
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
                handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setActivation(JSON.parse(event.target.value))
                }
            />

            {activation && (
                <Fragment
                    type="text"
                    title="turn"
                    value={turn}
                    handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setTurn(event.target.value)
                    }
                />
            )}

            <Fragment
                type="inputSelect"
                title="ranked"
                array={[true, false]}
                nameObj={{ true: { name: 'Yes' }, false: { name: 'No' } }}
                value={ranked}
                handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setRanked(JSON.parse(event.target.value))
                }
            />

            <Fragment
                type="description"
                value={description}
                handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setDescription(event.target.value)
                }
            />

            <Fragment
                type="inputSelect"
                title="prerequisite"
                value={prerequisite}
                array={Object.keys(talents)}
                nameObj={talents}
                blankText={'None'}
                handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPrerequisite(event.target.value)
                }
            />

            <Fragment
                type="inputSelect"
                title="antirequisite"
                value={antirequisite}
                array={Object.keys(talents)}
                nameObj={talents}
                blankText={'None'}
                handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setAntirequisite(event.target.value)
                }
            />

            <Fragment
                type="inputSelect"
                title="modifier"
                array={[true, false]}
                nameObj={{ true: { name: 'Yes' }, false: { name: 'No' } }}
                value={Boolean(modifier)}
                blankOption={false}
                handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setModifier(JSON.parse(event.target.value));
                    setModifierValue('');
                }}
            />

            {modifier && (
                <Fragment
                    type="inputSelect"
                    title="Attribute"
                    value={modifier}
                    array={modifiableAttributes
                        .concat(Object.keys(skills), chars)
                        .sort()}
                    nameObj={skills}
                    handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setModifier(event.target.value);
                        setModifierValue('');
                    }}
                />
            )}

            {modifier === 'careerSkills' && (
                <Fragment
                    type="inputSelect"
                    title="modifierValue"
                    value=""
                    array={Object.keys(skills).filter(
                        skill => !Array.isArray(modifierValue) || !modifierValue.includes(skill)
                    )}
                    nameObj={skills}
                    handleChange={handleList}
                />
            )}

            {modifiableAttributes.includes(modifier as string) &&
                modifier !== 'careerSkills' && (
                    <Fragment
                        type="number"
                        value={modifierValue}
                        title="modifierValue"
                        handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setModifierValue(+event.target.value)
                        }
                    />
                )}

            {Object.keys(skills).includes(modifier as string) && (
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
            )}

            {Array.isArray(modifierValue) && (
                <Fragment
                    type="list"
                    title="modifierList"
                    array={modifierValue}
                    nameObj={{ ...skills, diceNames }}
                    handleClear={() => setModifierValue([])}
                />
            )}
            <hr />
            <ControlButtonSet
                mode={mode}
                type={'Talent'}
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
                        <th>TIER</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {customTalents &&
                        Object.keys(customTalents)
                            .sort((a, b) =>
                                customTalents[a].name >
                                customTalents[b].name
                                    ? 1
                                    : -1
                            )
                            .map(key => (
                                <tr key={key}>
                                    <td>{customTalents[key].name}</td>
                                    <td>{customTalents[key].tier}</td>
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

import { addDataSet, modifyDataSet, removeDataSet } from '@emporium/actions';
import { chars } from '@emporium/data-lists';
import { ControlButtonSet, DeleteButton } from '@emporium/ui';
import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { Fragment } from './Fragments';

interface CustomSkillsProps {
    handleClose?: () => void;
}

export const CustomSkills = ({ handleClose }: CustomSkillsProps) => {
    const dispatch = useDispatch();
    const customSkills = useSelector((state: any) => state.customSkills);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [characteristic, setCharacteristic] = useState('');
    const [setting, setSetting] = useState<any[]>([]);
    const [mode, setMode] = useState('add');

    const _type = 'customSkills';

    const initState = useCallback(() => {
        setName('');
        setType('');
        setCharacteristic('');
        setSetting([]);
        setMode('add');
    }, []);

    const handleCloseModal = useCallback(() => {
        initState();
        handleClose?.();
    }, [initState, handleClose]);

    const handleDuplicate = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const { id, ...data } = { ...customSkills[event.currentTarget.name] };
        dispatch(addDataSet(_type, {
            ...data,
            name: `${data.name} (copy)`
        }));
        event.preventDefault();
    }, [customSkills, dispatch]);

    const handleSubmit = useCallback((event: React.MouseEvent) => {
        const data = { name, type, characteristic, setting };
        if (mode === 'add') {
            dispatch(addDataSet(_type, data));
        } else if (mode === 'edit') {
            dispatch(modifyDataSet(_type, data));
        }
        initState();
        event.preventDefault();
    }, [name, type, characteristic, setting, mode, dispatch, initState]);

    const handleDelete = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(removeDataSet(
            _type,
            customSkills[event.currentTarget.name].id
        ));
        event.preventDefault();
    }, [customSkills, dispatch]);

    const handleEdit = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const skill = customSkills[event.currentTarget.name];
        setName(skill.name);
        setType(skill.type);
        setCharacteristic(skill.characteristic);
        setSetting(typeof skill.setting === 'string'
            ? skill.setting.split(', ')
            : skill.setting);
        setMode('edit');
    }, [customSkills]);

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
                type="inputSelect"
                name="type"
                value={type}
                array={[
                    'General',
                    'Combat',
                    'Social',
                    'Magic',
                    'Knowledge'
                ]}
                handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setType(event.target.value)
                }
            />

            <Fragment
                type="inputSelect"
                name="characteristic"
                value={characteristic}
                array={chars}
                handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setCharacteristic(event.target.value)
                }
            />

            <Fragment
                type="setting"
                setting={setting}
                setState={(selected: any[]) => setSetting(selected)}
            />

            <ControlButtonSet
                mode={mode}
                type={'Skill'}
                handleSubmit={handleSubmit}
                onEditSubmit={handleSubmit}
                onEditCancel={initState}
                disabled={
                    name === '' || type === '' || characteristic === ''
                }
            />

            <Table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>TYPE</th>
                        <th>CHAR</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(customSkills)
                        .sort((a, b) =>
                            customSkills[a].name > customSkills[b].name
                                ? 1
                                : -1
                        )
                        .map(key => (
                            <tr key={key}>
                                <td>{customSkills[key].name}</td>
                                <td>{customSkills[key].type}</td>
                                <td>{customSkills[key].characteristic}</td>
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
                                            onClick={handleDuplicate}
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

import { addDataSet, modifyDataSet, removeDataSet } from '@emporium/actions';
import { ControlButtonSet, DeleteButton } from '@emporium/ui';
import { uniq } from 'lodash-es';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { Fragment } from './Fragments';

interface CustomCareersProps {
    handleClose: () => void;
}

const initialState = {
    name: '',
    selectedSkills: [],
    description: '',
    setting: [],
    mode: 'add'
};

export const CustomCareers = ({ handleClose }: CustomCareersProps) => {
    const dispatch = useDispatch();
    const customCareers = useSelector((state: any) => state.customCareers);
    const skills = useSelector((state: any) => state.skills);

    const [state, setState] = useState<any>(initialState);

    const { name, selectedSkills, description, setting, mode } = state;

    const initState = useCallback(() => {
        setState(initialState);
    }, []);

    const handleCloseWrapper = useCallback(() => {
        initState();
        handleClose();
    }, [initState, handleClose]);

    const handleSelect = useCallback((event: any) => {
        setState((prev: any) => ({
            ...prev,
            selectedSkills: [...prev.selectedSkills, event.target.value]
        }));
        event.preventDefault();
    }, []);

    const handleSubmit = useCallback(() => {
        const { selectedSkills, mode, ...rest } = state;
        const data = { ...rest, skills: selectedSkills };
        if (mode === 'add') {
            dispatch(addDataSet('customCareers', data));
        } else if (mode === 'edit') {
            dispatch(modifyDataSet('customCareers', data));
        }
        initState();
    }, [state, dispatch, initState]);

    const handleDuplicate = useCallback((event: any) => {
        const { id, ...data } = { ...customCareers[event.target.name] };
        dispatch(addDataSet('customCareers', {
            ...data,
            name: `${data.name} (copy)`
        }));
        event.preventDefault();
    }, [customCareers, dispatch]);

    const handleDelete = useCallback((event: any) => {
        dispatch(removeDataSet(
            'customCareers',
            customCareers[event.target.name].id
        ));
        event.preventDefault();
    }, [customCareers, dispatch]);

    const handleEdit = useCallback((event: any) => {
        const career = customCareers[event.target.name];
        setState({
            ...career,
            selectedSkills: career.skills ? uniq(career.skills) : [],
            setting:
                typeof career.setting === 'string'
                    ? career.setting.split(', ')
                    : career.setting,
            mode: 'edit'
        });
    }, [customCareers]);

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
                name="selectedSkills"
                type="inputSelect"
                array={Object.keys(skills)
                    .filter(skill => !selectedSkills.includes(skill))
                    .sort()}
                nameObj={skills}
                handleChange={handleSelect}
            />

            <Fragment
                type="list"
                array={selectedSkills}
                nameObj={skills}
                handleClear={() => setState((prev: any) => ({ ...prev, selectedSkills: [] }))}
            />

            <Fragment
                type="description"
                value={description}
                handleChange={event =>
                    setState((prev: any) => ({ ...prev, description: event.target.value }))
                }
            />

            <ControlButtonSet
                mode={mode}
                type={'Career'}
                handleSubmit={handleSubmit}
                onEditSubmit={handleSubmit}
                onEditCancel={initState}
                disabled={name === '' || 0 >= selectedSkills.length}
            />

            <Table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>SKILLS</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(customCareers)
                        .sort((a, b) =>
                            customCareers[a].name > customCareers[b].name
                                ? 1
                                : -1
                        )
                        .map(key => (
                            <tr key={key} style={{ textAlign: 'left' }}>
                                <td>{customCareers[key].name}</td>
                                <td>
                                    {customCareers[key].skills &&
                                        customCareers[key].skills
                                            .map(skill =>
                                                skills[skill]
                                                    ? skills[skill].name
                                                    : skill
                                            )
                                            .join(', ')}
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

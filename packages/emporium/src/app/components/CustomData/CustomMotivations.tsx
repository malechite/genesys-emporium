import { addDataSet, modifyDataSet, removeDataSet } from '@emporium/actions';
import { ControlButtonSet, DeleteButton } from '../';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { Fragment } from './Fragments';

interface CustomMotivationsProps {
    handleClose?: () => void;
}

const initialState = {
    type: '',
    name: '',
    description: '',
    mode: 'add'
};

export const CustomMotivations = ({ handleClose }: CustomMotivationsProps) => {
    const dispatch = useDispatch() as any;
    const customMotivations = useSelector((state: any) => state.customMotivations);

    const [state, setState] = useState<any>(initialState);

    const { name, type, description, mode } = state;

    const initState = useCallback(() => {
        setState(initialState);
    }, []);

    const handleCloseWrapper = useCallback(() => {
        initState();
        handleClose();
    }, [initState, handleClose]);

    const handleDuplicate = useCallback((event: any) => {
        const { id, ...data } = { ...customMotivations[event.target.name] };
        dispatch(addDataSet('customMotivations', {
            ...data,
            name: `${data.name} (copy)`
        }));
        event.preventDefault();
    }, [customMotivations, dispatch]);

    const handleSubmit = useCallback(() => {
        const { mode, ...data } = state;
        if (mode === 'add') {
            dispatch(addDataSet('customMotivations', data));
        } else if (mode === 'edit') {
            dispatch(modifyDataSet('customMotivations', data));
        }
        initState();
    }, [state, dispatch, initState]);

    const handleDelete = useCallback((event: any) => {
        dispatch(removeDataSet(
            'customMotivations',
            customMotivations[event.target.name].id
        ));
        event.preventDefault();
    }, [customMotivations, dispatch]);

    const handleEdit = useCallback((event: any) => {
        const data = customMotivations[event.target.name];
        setState({
            ...data,
            mode: 'edit'
        });
    }, [customMotivations]);

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
                type="inputSelect"
                name="type"
                value={type}
                array={['Strength', 'Flaw', 'Desire', 'Fear']}
                handleChange={event =>
                    setState((prev: any) => ({ ...prev, type: event.target.value }))
                }
            />

            <Fragment
                type="description"
                value={description}
                mode={mode}
                handleChange={event =>
                    setState((prev: any) => ({ ...prev, description: event.target.value }))
                }
            />

            <ControlButtonSet
                mode={mode}
                type={'motivation'}
                handleSubmit={handleSubmit}
                onEditSubmit={handleSubmit}
                onEditCancel={initState}
                disabled={name === '' || type === ''}
            />

            <Table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>TYPE</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(customMotivations).map(key => (
                        <tr key={key}>
                            <td>{customMotivations[key].name}</td>
                            <td>{customMotivations[key].type}</td>
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

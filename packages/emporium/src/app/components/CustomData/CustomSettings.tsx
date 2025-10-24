import { DeleteButton } from '../';
import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Row, Table } from 'reactstrap';
import { Fragment } from './Fragments';

interface CustomSettingsProps {}

export const CustomSettings = ({}: CustomSettingsProps) => {
    const customSettings = useSelector((state: any) => state.customSettings);
    const [name, setName] = useState('');

    const initState = useCallback(() => {
        setName('');
    }, []);

    const handleSubmit = useCallback((event: React.MouseEvent) => {
        initState();
        event.preventDefault();
    }, [initState]);

    const handleDelete = useCallback((event: React.MouseEvent) => {
        event.preventDefault();
    }, []);

    return (
        <div>
            <Fragment
                type="name"
                value={name}
                handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setName(event.target.value)
                }
            />
            <Row className="my-4 justify-content-end">
                <Button onClick={handleSubmit} className="btn">
                    ADD
                </Button>
            </Row>
            <Row>
                <Col sm="6">
                    <Table>
                        <thead>
                            <tr>
                                <th>CUSTOM SETTINGS</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(customSettings).map(key => (
                                <tr key={key}>
                                    <td>{customSettings[key]}</td>
                                    <td>
                                        <DeleteButton
                                            name={key}
                                            onClick={handleDelete}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    );
};

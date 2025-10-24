import { changeData } from '@emporium/actions';
import { criticalText } from '@emporium/selectors';
import { DeleteButton } from '@emporium/ui';
import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Row, Table } from 'reactstrap';
import { Description } from '../Description';
import styled from 'styled-components';

interface CriticalProps {}

export const Critical = ({}: CriticalProps) => {
    const [value, setValue] = useState<number | null>(null);

    const critical = useSelector((state: any) => state.critical);
    const theme = useSelector((state: any) => state.theme);
    const dispatch = useDispatch();

    const handleSubmit = useCallback((event: React.FormEvent) => {
        const newArr = [...critical];
        if (value != null && value > 0) {
            newArr.push(value);
            dispatch(changeData(newArr, 'critical'));
        }

        setValue(null);
        event.preventDefault();
    }, [critical, value, dispatch]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const radix = 10;
        const inputValue = event.target.value;
        if (inputValue) {
            const number = parseInt(inputValue.replace(/\D+/g, ''), radix);
            if (!isNaN(number) && number <= 999) {
                setValue(number);
            }
        } else {
            setValue(null);
        }

        event.preventDefault();
    }, []);

    const handleDelete = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const newArr = [...critical];
        newArr.splice(Number((event.target as HTMLButtonElement).value), 1);
        dispatch(changeData(newArr, 'critical'));
    }, [critical, dispatch]);

    const criticalInputKeypress = useCallback((event: React.KeyboardEvent): void => {
        if (event.key === 'Enter') {
            handleSubmit(event as any);
        }
    }, [handleSubmit]);

    return (
        <CriticalContainer>
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>
                    CRITICAL INJURES
                </div>
            </Row>
            <hr />
            <Table className="bg-light">
                <thead>
                    <tr>
                        <th>CRITICAL</th>
                        <th>DESCRIPTION</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {critical.map((critRoll, index) => (
                        <tr className="my-2" key={index}>
                            <td>
                                <b>{critRoll}:</b>
                            </td>
                            <td>
                                <Description
                                    text={criticalText(critRoll)}
                                />
                            </td>
                            <td>
                                <DeleteButton
                                    value={index}
                                    onClick={handleDelete}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Row className="my-2 justify-content-end">
                <b className="my-auto">Add Critical:</b>
                <Input
                    className="w-20 mx-2"
                    bsSize="sm"
                    type="number"
                    name="critical"
                    value={value != null ? value : ''}
                    onKeyPress={criticalInputKeypress}
                    onChange={handleChange}
                />
                <Button size="sm" onClick={handleSubmit}>
                    Add
                </Button>
            </Row>
        </CriticalContainer>
    );
};

// Styled Components
const CriticalContainer = styled.div`
    table td:last-child {
        text-align: right;
    }
`;

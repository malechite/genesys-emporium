import { changeData, changePrintContent } from '@emporium/actions';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Col, Input, Label, Row } from 'reactstrap';
import { UserButton } from './UserButton';
import { PrintLayout } from './printLayout';

export const Buttons = () => {
    const dispatch = useDispatch() as any;
    const theme = useSelector((state: any) => state.theme);
    const themes = useSelector((state: any) => state.themes);

    const handleThemeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeData(event.target.value, 'theme'));
    }, [dispatch]);

    const handlePrint = useCallback(() => {
        dispatch(changePrintContent(<PrintLayout />));
    }, [dispatch]);

    return (
        <Row className="m-1 justify-content-between d-print-none theme-select-container">
            <Col
                className="d-inline-flex"
                sm={4}
                style={{ fontSize: '0.7rem' }}
            >
                <Label for="theme" className="mr-1 my-auto">
                    <b>THEME</b>
                </Label>
                <Input
                    id="theme"
                    type="select"
                    value={theme}
                    bsSize="sm"
                    onChange={handleThemeChange}
                >
                    {Object.keys(themes)
                        .sort()
                        .map(key => (
                            <option value={key} key={key}>
                                {themes[key]}
                            </option>
                        ))}
                </Input>
            </Col>
            <div className="text-right print-button-container">
                <ButtonGroup>
                    <Button
                        size="sm"
                        onClick={handlePrint}
                    >
                        Print
                    </Button>
                    <UserButton />
                </ButtonGroup>
            </div>
        </Row>
    );
};

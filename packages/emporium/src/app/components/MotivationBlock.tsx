import { changeData } from '@emporium/actions';
import clone from 'clone';
import { random } from 'lodash-es';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardFooter, CardHeader, Input, InputGroup, InputGroupText } from 'reactstrap';

interface MotivationBlockProps {
    type: string;
}

export const MotivationBlock = ({ type }: MotivationBlockProps) => {
    const dispatch = useDispatch() as any;
    const masterMotivations = useSelector((state: any) => state.masterMotivations);
    const motivations = useSelector((state: any) => state.motivations);

    const [description, setDescription] = useState(() =>
        masterMotivations[type]
            ? masterMotivations[type].description
            : ''
    );

    const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
        event.preventDefault();
    }, []);

    const handleSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const obj = clone(masterMotivations);
        obj[type] = {
            key: event.target.value,
            description: motivations[event.target.value]
                ? motivations[event.target.value].description
                : ''
        };
        dispatch(changeData(obj, 'masterMotivations'));
        event.preventDefault();
    }, [masterMotivations, type, motivations, dispatch]);

    const handleBlur = useCallback((event: React.FocusEvent<HTMLTextAreaElement>) => {
        const obj = clone(masterMotivations);
        obj[type].description = description;
        dispatch(changeData(obj, 'masterMotivations'));
        event.preventDefault();
    }, [masterMotivations, type, description, dispatch]);

    const handleClick = useCallback(() => {
        const list = Object.keys(motivations).filter(
            key => motivations[key].type === type
        );
        const newKey = list[random(list.length - 1)];
        const obj = clone(masterMotivations);
        obj[type] = {
            key: newKey,
            description: motivations[newKey].description
        };
        dispatch(changeData(obj, 'masterMotivations', false));
    }, [motivations, type, masterMotivations, dispatch]);

    const name = masterMotivations[type] ? masterMotivations[type].key : '';

    const filteredOptions = useMemo(() =>
        Object.keys(motivations)
            .filter(key => motivations[key].type === type)
            .sort(),
        [motivations, type]
    );

    return (
        <Card className="m-2 motivationCard">
            <CardHeader>
                <InputGroup>
                    <InputGroupText className="m-auto">
                        {type}:
                    </InputGroupText>
                    <Input
                        type="select"
                        bsSize="sm"
                        onChange={handleSelect}
                        style={{ marginLeft: '1vw' }}
                        value={name}
                    >
                        <option value="" />
                        {filteredOptions.map(key => (
                            <option key={key} value={key}>
                                {motivations[key].name}
                            </option>
                        ))}
                    </Input>
                </InputGroup>
            </CardHeader>
            <CardBody>
                <textarea
                    onBlur={handleBlur}
                    onChange={handleChange}
                    rows={10}
                    style={{ width: '100%' }}
                    className="textField"
                    maxLength={1000}
                    placeholder={description ? '' : `Enter your ${type}...`}
                    value={description}
                ></textarea>
            </CardBody>
            <CardFooter>
                <button onClick={handleClick}>Random</button>
            </CardFooter>
        </Card>
    );
};

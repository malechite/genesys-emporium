import { changeData } from '@emporium/actions';
import clone from 'clone';
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Input, Label, Row } from 'reactstrap';

interface CharacterDescriptionProps {}

export const CharacterDescription = ({}: CharacterDescriptionProps) => {
    const dispatch = useDispatch() as any;
    const description = useSelector((state: any) => state.description);
    const theme = useSelector((state: any) => state.theme);

    const {
        gender: initialGender = '',
        age: initialAge = '',
        height: initialHeight = '',
        build: initialBuild = '',
        hair: initialHair = '',
        eyes: initialEyes = '',
        features: initialFeatures = ''
    } = description;

    const [gender, setGender] = useState(initialGender);
    const [age, setAge] = useState(initialAge);
    const [height, setHeight] = useState(initialHeight);
    const [build, setBuild] = useState(initialBuild);
    const [hair, setHair] = useState(initialHair);
    const [eyes, setEyes] = useState(initialEyes);
    const [features, setFeatures] = useState(initialFeatures);

    const stateMap: Record<string, string> = {
        gender,
        age,
        height,
        build,
        hair,
        eyes,
        features
    };

    const handleBlur = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            const obj = clone(description);
            obj[event.target.name] = stateMap[event.target.name];
            dispatch(changeData(obj, 'description'));
            event.preventDefault();
        },
        [description, dispatch, stateMap]
    );

    const setters: Record<string, (value: string) => void> = {
        gender: setGender,
        age: setAge,
        height: setHeight,
        build: setBuild,
        hair: setHair,
        eyes: setEyes,
        features: setFeatures
    };

    return (
        <div>
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>
                    CHARACTER DESCRIPTION
                </div>
            </Row>
            <hr />
            {['gender', 'age', 'height', 'build', 'hair', 'eyes'].map(
                aspect => (
                    <Row key={aspect} className="align-items-center">
                        <Label for={aspect} sm={2}>
                            <b>{aspect.toLocaleUpperCase()}</b>
                        </Label>
                        <Col md="10" className="align-self-center">
                            <Input
                                value={stateMap[aspect]}
                                id={aspect}
                                maxLength={25}
                                bsSize="sm"
                                name={aspect}
                                onBlur={handleBlur}
                                onChange={event =>
                                    setters[aspect](event.target.value)
                                }
                            />
                        </Col>
                        <hr />
                    </Row>
                )
            )}
            <Row>
                <Label sm={6} for="features">
                    <b>NOTABLE FEATURES</b>
                </Label>
                <Col sm={12}>
                    <Input
                        onChange={event => setFeatures(event.target.value)}
                        onBlur={handleBlur}
                        type="textarea"
                        rows="12"
                        className="w-100 my-auto"
                        maxLength={1000}
                        name="features"
                        id="features"
                        value={features}
                    />
                </Col>
            </Row>
        </div>
    );
};

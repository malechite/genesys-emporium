import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';

interface CharacterDescriptionProps {}

export const CharacterDescription = () => {
    const description = useSelector((state: any) => state.description);
    const theme = useSelector((state: any) => state.theme);

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
                    <Row key={aspect} className="my-2">
                        <Col sm="3">
                            <b>{aspect.toLocaleUpperCase()}:</b>
                        </Col>
                        <Col>{description[aspect]}</Col>
                        <hr />
                    </Row>
                )
            )}
            <Row className="my-2">
                <Col sm="3">
                    <b>NOTABLE FEATURES:</b>
                </Col>
                <Col>
                    {description.features ? description.features : ''}
                </Col>
            </Row>
        </div>
    );
};

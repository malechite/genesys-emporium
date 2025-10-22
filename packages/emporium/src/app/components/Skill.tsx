import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { SkillBlock } from './SkillBlock';

export const Skill = () => {
    const theme = useSelector((state: any) => state.theme);

    return (
        <div>
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>SKILLS</div>
            </Row>
            <hr />
            <Row>
                <Col>
                    {['General', 'Magic'].map(type => (
                        <SkillBlock key={type} type={type} />
                    ))}
                </Col>
                <Col>
                    {['Combat', 'Social', 'Knowledge'].map(type => (
                        <SkillBlock key={type} type={type} />
                    ))}
                </Col>
            </Row>
        </div>
    );
};

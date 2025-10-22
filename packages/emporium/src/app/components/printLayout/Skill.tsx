import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { SkillBlock } from './SkillBlock';

interface SkillProps {}

export const Skill = ({}: SkillProps) => {
    const theme = useSelector((state: any) => state.theme);

    return (
        <div>
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>SKILLS</div>
            </Row>
            <hr />
            <Row>
                <Col>
                    {['General', 'Magic'].map((type, index) => (
                        <SkillBlock key={type} type={type} index={index} />
                    ))}
                </Col>
                <Col>
                    {['Combat', 'Social', 'Knowledge'].map(
                        (type, index) => (
                            <SkillBlock
                                key={type}
                                type={type}
                                index={index}
                            />
                        )
                    )}
                </Col>
            </Row>
        </div>
    );
};

import React from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import { MotivationBlock } from './MotivationBlock';

export const Motivation = () => {
    const theme = useSelector((state: any) => state.theme);

    return (
        <div>
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>MOTIVATIONS</div>
            </Row>
            <hr />
            <Row className="justify-content-center">
                {['Strength', 'Flaw', 'Desire', 'Fear'].map(type => (
                    <MotivationBlock key={type} type={type} />
                ))}
            </Row>
        </div>
    );
};

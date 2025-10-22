import React from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'reactstrap';

interface MotivationsProps {}

export const Motivations = ({}: MotivationsProps) => {
    const masterMotivations = useSelector((state: any) => state.masterMotivations);
    const motivations = useSelector((state: any) => state.motivations);
    const theme = useSelector((state: any) => state.theme);

    return (
        <div>
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>MOTIVATIONS</div>
            </Row>
            <hr />
            {['Strength', 'Flaw', 'Desire', 'Fear'].map(type => (
                <Row className="justify-content-left" key={type}>
                    <b>{type.toUpperCase()}</b>
                    {masterMotivations[type] && (
                        <p>
                            <i>{masterMotivations[type].key}</i>:{' '}
                            {masterMotivations[type].description}
                        </p>
                    )}
                </Row>
            ))}
        </div>
    );
};

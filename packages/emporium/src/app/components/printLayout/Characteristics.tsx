import { chars } from '@emporium/data-lists';
import * as images from '@emporium/images';
import { characteristics } from '@emporium/selectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'reactstrap';

interface CharacteristicsProps {}

export const Characteristics = () => {
    const characteristicsValue = useSelector(characteristics);
    const theme = useSelector((state: any) => state.theme);

    return (
        <div>
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>
                    CHARACTERISTICS
                </div>
            </Row>
            <hr />
            <Row className="justify-content-center">
                {chars.map(stat => (
                    <div
                        className={`imageBox characteristic characteristic-${stat}`}
                        key={stat}
                    >
                        <img
                            src={images[theme][stat]}
                            alt=""
                            className="svg"
                        />
                        <Row
                            className={`characteristicValue characteristicValue-${theme}`}
                        >
                            {characteristicsValue[stat]}
                        </Row>
                    </div>
                ))}
            </Row>
        </div>
    );
};

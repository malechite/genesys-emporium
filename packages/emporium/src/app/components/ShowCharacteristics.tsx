import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Row } from 'reactstrap';
import { chars } from '@emporium/data';
import * as images from '@emporium/images';
import { characteristics as characteristicsSelector } from '@emporium/selectors';
import { Characteristics } from './Characteristics';

export const ShowCharacteristics = () => {
    const [modal, setModal] = useState(false);
    const characteristics = useSelector(characteristicsSelector);
    const theme = useSelector((state: any) => state.theme);

    return (
        <div>
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>
                    CHARACTERISTICS
                </div>
                <Button
                    color="link"
                    className="noUnderLine p-0"
                    onClick={() => setModal(true)}
                >
                    ⚙
                </Button>
            </Row>
            <hr />
            <Row className="justify-content-center">
                {chars.map(stat => (
                    <div className={`imageBox characteristic characteristic-${stat}`} key={stat}>
                        <img
                            src={images[theme][stat]}
                            alt=""
                            className="svg"
                        />
                        <Row
                            className={`characteristicValue characteristicValue-${theme}`}
                        >
                            {characteristics[stat]}
                        </Row>
                    </div>
                ))}
            </Row>
            <Characteristics
                modal={modal}
                handleClose={() => setModal(false)}
            />
        </div>
    );
};

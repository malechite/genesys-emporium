import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import * as images from '@emporium/images';
import { totalXP as totalXPSelector, usedXP as usedXPSelector } from '@emporium/selectors';
import { XPPopup } from './XPPopup';

export const XPBoxes = () => {
    const [modal, setModal] = useState(false);
    const totalXP = useSelector(totalXPSelector);
    const usedXP = useSelector(usedXPSelector);
    const theme = useSelector((state: any) => state.theme);

    return (
        <div>
            <div
                className={`imageBox xpBox totalXP`}
                onClick={() => setModal(true)}
            >
                <img src={images[theme].TotalXp} alt="" className="svg" />
                <Row className={`xpValue xpValue-${theme}`}>{totalXP}</Row>
            </div>

            <div
                className={`imageBox xpBox availableXP availableXP-${theme}`}
                onClick={() => setModal(true)}
            >
                <img
                    src={images[theme].AvailableXp}
                    alt=""
                    className="svg"
                />

                <Row className={`xpValue xpValue-${theme}`}>
                    {totalXP - usedXP}
                </Row>
            </div>
            <XPPopup
                modal={modal}
                handleClose={() => setModal(false)}
            />
        </div>
    );
};

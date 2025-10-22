import * as images from '@emporium/images';
import { totalXP, usedXP } from '@emporium/selectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'reactstrap';

interface XPProps {}

export const XP = ({}: XPProps) => {
    const totalXPSelector = useSelector((state: any) => totalXP(state));
    const usedXPSelector = useSelector((state: any) => usedXP(state));
    const theme = useSelector((state: any) => state.theme);

    return (
        <div className="break-after">
            <Row className="justify-content-between">
                <div className={`imageBox xpBox totalXp`}>
                    <img
                        src={images[theme].TotalXp}
                        alt=""
                        className="svg"
                    />
                    <Row className={`xpValue xpValue-${theme}`}>
                        {totalXPSelector}
                    </Row>
                </div>

                <div className={`imageBox xpBox availableXP availableXP`}>
                    <img
                        src={images[theme].AvailableXp}
                        alt=""
                        className="svg"
                    />
                    <Row className={`xpValue xpValue-${theme}`}>
                        {totalXPSelector - usedXPSelector}
                    </Row>
                </div>
            </Row>
        </div>
    );
};

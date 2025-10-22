import React from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import * as images from '@emporium/images';
import {
    encumbranceLimit,
    strainThreshold,
    totalDefense,
    totalEncumbrance,
    totalSoak,
    woundThreshold
} from '@emporium/selectors';

interface AttributesProps {}

export const Attributes = () => {
    const woundThresholdValue = useSelector(woundThreshold);
    const strainThresholdValue = useSelector(strainThreshold);
    const totalSoakValue = useSelector(totalSoak);
    const totalDefenseValue = useSelector(totalDefense);
    const currentWound = useSelector((state: any) => state.currentWound);
    const currentStrain = useSelector((state: any) => state.currentStrain);
    const theme = useSelector((state: any) => state.theme);

    return (
        <div>
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>ATTRIBUTES</div>
            </Row>
            <hr />
            <Row className="my-2 justify-content-center">
                <div className="imageBox attribute attribute-wounds">
                    <img
                        src={images[theme].Wounds}
                        alt=""
                        className="svg"
                    />
                    <Row
                        className={`attributeValue attributeValue-${theme}-Wounds`}
                    >
                        <div className="mr-2 p-1">{woundThresholdValue}</div>
                        <div className="ml-2 p-1">{currentWound}</div>
                    </Row>
                </div>
                <div className="imageBox attribute attribute-strain">
                    <img
                        src={images[theme].Strain}
                        alt=""
                        className="svg"
                    />
                    <Row
                        className={`attributeValue attributeValue-${theme}-Strain`}
                    >
                        <div className="mr-2 p-1">{strainThresholdValue}</div>
                        <div className="ml-2 p-1">{currentStrain}</div>
                    </Row>
                </div>
                <div className="imageBox attribute attribute-soak">
                    <img src={images[theme].Soak} alt="" className="svg" />
                    <Row
                        className={`attributeValue attributeValue-${theme}-Soak`}
                    >
                        {totalSoakValue}
                    </Row>
                </div>
                <div className="imageBox attribute attribute-defense">
                    <img
                        src={images[theme].Defense}
                        alt=""
                        className="svg"
                    />
                    <Row
                        className={`attributeValue attributeValue-${theme}-Defense`}
                    >
                        <div className="mr-2 p-1">{totalDefenseValue.melee}</div>
                        <div className="ml-2 p-1">
                            {totalDefenseValue.ranged}
                        </div>
                    </Row>
                </div>
            </Row>
        </div>
    );
};

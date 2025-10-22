import { changeData } from '@emporium/actions';
import * as images from '@emporium/images';
import * as selectors from '@emporium/selectors';
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Row } from 'reactstrap';

interface AttributesProps {}

export const Attributes = ({}: AttributesProps) => {
    const dispatch = useDispatch();
    const woundThreshold = useSelector((state: any) => selectors.woundThreshold(state));
    const strainThreshold = useSelector((state: any) => selectors.strainThreshold(state));
    const totalSoak = useSelector((state: any) => selectors.totalSoak(state));
    const totalDefense = useSelector((state: any) => selectors.totalDefense(state));
    const currentWoundFromState = useSelector((state: any) => state.currentWound);
    const currentStrainFromState = useSelector((state: any) => state.currentStrain);
    const theme = useSelector((state: any) => state.theme);

    const [currentStrain, setCurrentStrain] = useState(currentStrainFromState);
    const [currentWound, setCurrentWound] = useState(currentWoundFromState);

    const handleWoundBlur = useCallback(() => {
        dispatch(changeData(currentWound, 'currentWound'));
    }, [currentWound, dispatch]);

    const handleStrainBlur = useCallback(() => {
        dispatch(changeData(currentStrain, 'currentStrain'));
    }, [currentStrain, dispatch]);

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
                        <div className="mr-2 p-1">{woundThreshold}</div>
                        <Input
                            type="number"
                            bsSize="sm"
                            name="currentWound"
                            maxLength="2"
                            className="attributeInput ml-2"
                            onChange={event =>
                                setCurrentWound(+event.target.value)
                            }
                            onBlur={handleWoundBlur}
                            value={currentWound > 0 ? currentWound : ''}
                        />
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
                        <div className="mr-2 p-1">{strainThreshold}</div>
                        <Input
                            type="number"
                            name="currentStrain"
                            maxLength="2"
                            bsSize="sm"
                            className="attributeInput ml-2"
                            onChange={event =>
                                setCurrentStrain(+event.target.value)
                            }
                            onBlur={handleStrainBlur}
                            value={currentStrain > 0 ? currentStrain : ''}
                        />
                    </Row>
                </div>
                <div className="imageBox attribute attribute-soak">
                    <img src={images[theme].Soak} alt="" className="svg" />
                    <Row
                        className={`attributeValue attributeValue-${theme}-Soak`}
                    >
                        {totalSoak}
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
                        <div className="mr-2">{totalDefense.melee}</div>
                        <div className="ml-2">{totalDefense.ranged}</div>
                    </Row>
                </div>
            </Row>
        </div>
    );
};

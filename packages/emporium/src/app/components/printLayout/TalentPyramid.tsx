import { talentCount } from '@emporium/selectors';
import React, { useCallback } from 'react';
import DynamicFont from 'react-dynamic-font';
import { useSelector } from 'react-redux';
import { Card, CardBody, Row } from 'reactstrap';

interface TalentPyramidProps {}

export const TalentPyramid = ({}: TalentPyramidProps) => {
    const masterTalents = useSelector((state: any) => state.masterTalents);
    const talents = useSelector((state: any) => state.talents);
    const talentCountSelector = useSelector((state: any) => talentCount(state));
    const theme = useSelector((state: any) => state.theme);

    const activation = useCallback((talentKey: string): string => {
        if (talentKey === '') {
            return 'var(--light)';
        }

        if (!talents[talentKey]) {
            return 'var(--red)';
        }

        if (talents[talentKey].activation) {
            return 'var(--orange)';
        } else {
            return 'var(--lightblue)';
        }
    }, [talents]);

    return (
        <div className="break-before">
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>TALENTS</div>
            </Row>
            <hr />
            {Object.keys(masterTalents).map(row => (
                <Row key={row}>
                    {Object.keys(masterTalents[row]).map(tier => {
                        const talent = talents[masterTalents[row][tier]];
                        return (
                            <Card
                                key={row + tier}
                                className="m-2 my-3 talentCard"
                            >
                                <CardBody
                                    className="p-1 text-center"
                                    style={{
                                        backgroundColor: activation(
                                            masterTalents[row][tier]
                                        )
                                    }}
                                >
                                    <DynamicFont
                                        content={
                                            masterTalents[row][tier] === ''
                                                ? 'inactive'
                                                : talent
                                                ? talent.name
                                                : 'Missing Talent'
                                        }
                                    />
                                </CardBody>
                            </Card>
                        );
                    })}
                </Row>
            ))}
        </div>
    );
};

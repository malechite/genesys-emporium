import { talentCount } from '@emporium/selectors';
import React, { useMemo, useState } from 'react';
import DynamicFont from 'react-dynamic-font';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { Description } from './Description';
import { TalentSelection } from './TalentSelection';

interface TalentBlockProps {
    talentKey: string;
    row: number;
    tier: number;
}

export const TalentBlock = ({ talentKey, row, tier }: TalentBlockProps) => {
    const [modal, setModal] = useState(false);

    const masterTalents = useSelector((state: any) => state.masterTalents);
    const talents = useSelector((state: any) => state.talents);
    const talentCountValue = useSelector((state: any) => talentCount(state));

    const activation = useMemo(() => {
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
    }, [talents, talentKey]);

    const talent = talents[talentKey];
    const color = activation;

    return (
        <div>
            <TalentSelection
                modal={modal}
                handleClose={() => setModal(false)}
                row={row}
                tier={tier}
                talentKey={talentKey}
            />
            <Card
                onClick={() => setModal(true)}
                className="m-1 talentCard"
            >
                <CardHeader
                    className="p-1 text-center"
                    style={{ backgroundColor: color }}
                >
                    <DynamicFont
                        content={
                            talentKey === ''
                                ? 'inactive'
                                : talent
                                ? talent.name
                                : 'Missing Talent'
                        }
                    />
                </CardHeader>
                <CardBody className="p-1 talentDesc">
                    <Description
                        text={
                            talent
                                ? talent.description
                                    ? `${talent.description}\n\n ${
                                          talent.activation
                                              ? talent.turn
                                              : ''
                                      }`
                                    : ''
                                : ''
                        }
                    />
                </CardBody>
            </Card>
        </div>
    );
};

import React from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import { TalentBlock } from './TalentBlock';

export const Talents = () => {
    const masterTalents = useSelector((state: any) => state.masterTalents);
    const theme = useSelector((state: any) => state.theme);

    return (
        <div>
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>TALENTS</div>
            </Row>
            <hr />
            {Object.keys(masterTalents).map(row => (
                <Row key={row} className="">
                    {Object.keys(masterTalents[row]).map(tier => (
                        <TalentBlock
                            key={row + tier}
                            row={+row}
                            tier={+tier}
                            talentKey={masterTalents[row][tier]}
                        />
                    ))}
                </Row>
            ))}
        </div>
    );
};

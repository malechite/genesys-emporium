import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Table } from 'reactstrap';
import { SkillRow } from './SkillRow';

interface SkillBlockProps {
    type: string;
    index: number;
}

export const SkillBlock = ({ type, index }: SkillBlockProps) => {
    const skills = useSelector((state: any) => state.skills);
    const masterSkills = useSelector((state: any) => state.masterSkills);

    return (
        <div>
            <Row>
                <strong>{type}</strong>
            </Row>
            <Table className="table-skills">
                {0 >= index && (
                    <thead>
                        <tr>
                            <th className="table-name">Skill</th>
                            <th className="table-career">Career</th>
                            <th className="table-rank">Rank</th>
                            <th className="table-dice">Dice Pool</th>
                        </tr>
                    </thead>
                )}
                <tbody>
                    {Object.keys(skills)
                        .sort()
                        .map(
                            skillKey =>
                                skills[skillKey].type === type && (
                                    <SkillRow
                                        skillKey={skillKey}
                                        key={skillKey}
                                    />
                                )
                        )}
                </tbody>
            </Table>
        </div>
    );
};

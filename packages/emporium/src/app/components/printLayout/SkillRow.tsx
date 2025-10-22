import { archetypeSkillRank, careerCheck, skillDice, skillRanks } from '@emporium/selectors';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Description } from '../Description';

interface SkillRowProps {
    skillKey: string;
}

export const SkillRow = ({ skillKey }: SkillRowProps) => {
    const masterSkills = useSelector((state: any) => state.masterSkills);
    const skills = useSelector((state: any) => state.skills);
    const careerSkillsRank = useSelector((state: any) => state.careerSkillsRank);
    const career = useSelector((state: any) => state.career);
    const careers = useSelector((state: any) => state.careers);
    const skillDiceSelector = useSelector((state: any) => skillDice(state));
    const skillRanksSelector = useSelector((state: any) => skillRanks(state));
    const archetypeSkillRankSelector = useSelector((state: any) => archetypeSkillRank(state));
    const careerCheckSelector = useSelector((state: any) => careerCheck(state));

    const shortCharacteristics = useCallback((): string => {
        switch (skills[skillKey].characteristic) {
            case 'Agility':
                return 'AG';
            case 'Brawn':
                return 'BR';
            case 'Intellect':
                return 'INT';
            case 'Cunning':
                return 'CUN';
            case 'Willpower':
                return 'WILL';
            case 'Presence':
                return 'PR';
            default:
                return '';
        }
    }, [skills, skillKey]);

    const skill = skills[skillKey];
    const ranks = [0, 1, 2, 3, 4, 5];
    if (careerSkillsRank.includes(skillKey)) {
        ranks.shift();
    }
    if (archetypeSkillRankSelector[skillKey]) {
        for (let i = 0; archetypeSkillRankSelector[skillKey].rank > i; i++) {
            ranks.shift();
        }
    }

    return (
        <tr
            className={
                masterSkills[skillKey]
                    ? masterSkills[skillKey].hide
                        ? 'row-hide'
                        : ''
                    : ''
            }
        >
            <td className="table-name">
                {`${skill.name} (${shortCharacteristics()})`}
            </td>
            <td className="table-career">
                {careerCheckSelector[skillKey] ? '✓' : ''}
            </td>
            <td className="table-rank">
                {skillRanksSelector[skillKey] ? skillRanksSelector[skillKey] : ''}
            </td>
            <td className="table-dice ">
                <Description text={skillDiceSelector[skillKey]} />
            </td>
        </tr>
    );
};

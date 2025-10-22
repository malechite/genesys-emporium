import { changeData } from '@emporium/actions';
import { archetypeSkillRank as archetypeSkillRankSelector, careerCheck as careerCheckSelector, skillDice as skillDiceSelector, skillRanks as skillRanksSelector } from '@emporium/selectors';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'reactstrap';
import { Description } from './Description';

interface SkillRowProps {
    skillKey: string;
}

export const SkillRow = ({ skillKey }: SkillRowProps) => {
    const dispatch = useDispatch();
    const archetype = useSelector((state: any) => state.archetype);
    const masterSkills = useSelector((state: any) => state.masterSkills);
    const skills = useSelector((state: any) => state.skills);
    const careerSkillsRank = useSelector((state: any) => state.careerSkillsRank);
    const career = useSelector((state: any) => state.career);
    const skillDice = useSelector(skillDiceSelector);
    const skillRanks = useSelector(skillRanksSelector);
    const archetypeSkillRank = useSelector(archetypeSkillRankSelector);
    const careerCheck = useSelector(careerCheckSelector);

    const handleRankChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newObj = { ...masterSkills };
        const rankType = careerCheck[skillKey] ? 'careerRank' : 'rank';
        if (!newObj[skillKey]) {
            newObj[skillKey] = {};
        }
        newObj[skillKey][rankType] =
            +event.target.value -
            (careerSkillsRank.includes(skillKey) ? 1 : 0) -
            (archetypeSkillRank[skillKey]
                ? archetypeSkillRank[skillKey].rank
                : 0) -
            (careerCheck[skillKey] &&
            (masterSkills[skillKey] ? masterSkills[skillKey].rank > 0 : false)
                ? careerCheck[skillKey]
                : 0);
        dispatch(changeData(newObj, 'masterSkills'));
    }, [masterSkills, skillKey, careerCheck, careerSkillsRank, archetypeSkillRank, dispatch]);

    const shortCharacteristics = useMemo(() => {
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

    const ranks = useMemo(() => {
        const ranksArray = [0, 1, 2, 3, 4, 5];
        if (careerSkillsRank.includes(skillKey)) {
            ranksArray.shift();
        }
        if (archetypeSkillRank[skillKey]) {
            for (let i = 0; archetypeSkillRank[skillKey].rank > i; i++) {
                ranksArray.shift();
            }
        }
        return ranksArray;
    }, [careerSkillsRank, archetypeSkillRank, skillKey]);

    const skill = skills[skillKey];

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
                {`${skill.name} (${shortCharacteristics})`}
            </td>
            <td className="table-career">
                {careerCheck[skillKey] ? '✓' : ''}
            </td>
            <td className="table-rank">
                <Input
                    type="select"
                    bsSize="sm"
                    disabled={!archetype || !career}
                    value={skillRanks[skillKey]}
                    onChange={handleRankChange}
                    className="p-0 m-0"
                >
                    {ranks.map(key => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </Input>
            </td>
            <td className="table-dice">
                <Description text={skillDice[skillKey]} />
            </td>
        </tr>
    );
};

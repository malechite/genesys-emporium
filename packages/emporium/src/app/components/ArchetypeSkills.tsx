import { changeData } from '@emporium/actions';
import clone from 'clone';
import { get } from 'lodash-es';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Input, Row } from 'reactstrap';

interface ArchetypeSkillsProps {
    id?: string;
}

export const ArchetypeSkills = ({ id }: ArchetypeSkillsProps) => {
    const dispatch = useDispatch() as any;
    const archetype = useSelector((state: any) => state.archetype);
    const archetypes = useSelector((state: any) => state.archetypes);
    const archetypeSpecialSkills = useSelector((state: any) => state.archetypeSpecialSkills);
    const skills = useSelector((state: any) => state.skills);
    const careers = useSelector((state: any) => state.careers);
    const career = useSelector((state: any) => state.career);

    const handleCheck = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const masterArchetypeSkills = archetypes[archetype].skills;
        let obj = {};
        let count = 0;
        if (masterArchetypeSkills?.choose) {
            count = masterArchetypeSkills?.choose?.count || 1;
        } else {
            count = masterArchetypeSkills.choice;
        }
        if (count > Object.keys(archetypeSpecialSkills).length) {
            obj = clone(archetypeSpecialSkills);
        } else {
            dispatch(changeData('', 'archetypeSpecialSkills'));
        }
        obj[event.target.value] = {
            rank: Object.keys(masterArchetypeSkills).includes('any')
                ? masterArchetypeSkills.any
                : masterArchetypeSkills[event.target.value] ||
                  masterArchetypeSkills?.choose?.skills?.[event.target.value] ||
                  1
        };

        dispatch(changeData(obj, 'archetypeSpecialSkills'));
    }, [dispatch, archetype, archetypes, archetypeSpecialSkills]);

    const handleClear = useCallback(() => {
        dispatch(changeData('', 'archetypeSpecialSkills'));
    }, [dispatch]);

    const masterArchetype = useMemo(() => archetypes[archetype], [archetypes, archetype]);
    const careerSkills = useMemo(() => get(careers, `${career}.skills`, []), [careers, career]);

    const { list, count, existing, keys } = useMemo(() => {
        if (!masterArchetype) {
            return { list: [], count: 0, existing: <></>, keys: [] };
        }

        let list = [];
        let count = 0;
        let existing = <></>;

        if (masterArchetype?.skills?.choose) {
            count = masterArchetype?.skills?.choose?.count || 1;
            list = masterArchetype?.skills?.choose?.skills || {};
            const masterArchetypeSkills = Object.keys(
                masterArchetype?.skills
            ).filter(x => x !== 'choose' && x !== 'choice');
            existing = (
                <Row>
                    {masterArchetypeSkills.map((skill, index) => (
                        <div key={index}>
                            {masterArchetype?.skills[skill]} rank in{' '}
                            {skills[skill]?.name}
                        </div>
                    ))}
                </Row>
            );
        } else {
            list = Object.keys(masterArchetype.skills).includes('any')
                ? skills
                : masterArchetype.skills;
        }

        const keys = Object.keys(masterArchetype.skills);

        return { list, count, existing, keys };
    }, [masterArchetype, skills]);

    if (archetype === null) {
        return <div />;
    }

    if (keys.includes('choice') || keys.includes('choose')) {
        return (
            <Col>
                {existing}
                <Row>
                    Select {count || masterArchetype.skills.choice}{' '}
                    {(count || masterArchetype.skills.choice) > 1
                        ? 'options'
                        : 'option'}{' '}
                    to get free rank(s)
                </Row>
                <Input
                    type="select"
                    bsSize="sm"
                    value=""
                    name="archetypeSpecialSkills"
                    onChange={handleCheck}
                >
                    <option value="" />
                    {Object.keys(list).map(
                        key =>
                            skills[key] &&
                            !Object.keys(archetypeSpecialSkills).includes(
                                key
                            ) && (
                                <option value={key} key={key}>
                                    {skills[key].name}{' '}
                                    {typeof list[key] === 'number'
                                        ? `(${list[key]})`
                                        : '(1)'}
                                </option>
                            )
                    )}
                </Input>
                <Row className="my-2">
                    {Object.keys(archetypeSpecialSkills)
                        .filter(
                            x =>
                                // Ignore skills that are given with choice skills,
                                // if choice skills are available. If we don't do the
                                // or, we'll filter out skills from `choose`
                                keys.includes('choice') || !keys.includes(x)
                        )
                        .map(skill =>
                            skills[skill]
                                ? skills[skill].name +
                                  (typeof list[skill] === 'number'
                                      ? ` (${list[skill]})`
                                      : ' (1)')
                                : skill
                        )
                        .join(', ')}
                </Row>
                <Row className="my-2">
                    <Button onClick={handleClear}>
                        Clear
                    </Button>
                </Row>
            </Col>
        );
    }
    return (
        <div>
            {Object.keys(list).map(key => (
                <Col key={key}>
                    {masterArchetype.skills[key]} rank in{' '}
                    {skills[key]?.name || key}
                </Col>
            ))}
        </div>
    );
};

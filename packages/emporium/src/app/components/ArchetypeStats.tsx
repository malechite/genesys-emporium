import { changeData } from '@emporium/actions';
import { chars } from '@emporium/data-lists';
import * as images from '@emporium/images';
import clone from 'clone';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Input, Label, Row } from 'reactstrap';
import { ArchetypeSkills } from './ArchetypeSkills';
import { Description } from './Description';

interface ArchetypeStatsProps {}

export const ArchetypeStats = ({}: ArchetypeStatsProps) => {
    const dispatch = useDispatch();
    const archetype = useSelector((state: any) => state.archetype);
    const archetypes = useSelector((state: any) => state.archetypes);
    const archetypeTalents = useSelector((state: any) => state.archetypeTalents);
    const misc = useSelector((state: any) => state.misc);
    const theme = useSelector((state: any) => state.theme);

    const masterArchetype = useMemo(() => archetypes[archetype], [archetypes, archetype]);

    const handleSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const obj = clone(misc);
        obj.archetypeTalents = event.target.value;
        dispatch(changeData(obj, 'misc'));
    }, [dispatch, misc]);

    if (!archetype || !archetypes[archetype]) {
        return <div />;
    }

    return (
        <div>
            <Row className="my-2">
                <Col sm="5">
                    <b>Starting Stats</b>
                </Col>
            </Row>
            <Row className="justify-content-center my-2">
                {chars.map(stat => (
                    <div
                        className={`imageBox characteristic characteristic-${stat}`}
                        key={stat}
                    >
                        <img
                            src={images[theme][stat]}
                            alt=""
                            className="svg"
                        />
                        <Row
                            className={`characteristicValue characteristicValue-${theme}`}
                        >
                            {masterArchetype[stat]}
                        </Row>
                    </div>
                ))}
            </Row>
            {masterArchetype && (
                <Row className="justify-content-center my-2">
                    <div className="imageBox attribute attribute-WoundsThreshold">
                        <img
                            src={images[theme].WoundsThreshold}
                            alt=""
                            className="svg"
                        />
                        <Row
                            className={`attributeValue attributeValue-${theme}-WoundsThreshold`}
                        >
                            {masterArchetype.woundThreshold}
                        </Row>
                    </div>
                    <div className="imageBox attribute attribute-StrainThreshold">
                        <img
                            src={images[theme].StrainThreshold}
                            alt=""
                            className="svg"
                        />
                        <Row
                            className={`attributeValue attributeValue-${theme}-StrainThreshold`}
                        >
                            {masterArchetype.strainThreshold}
                        </Row>
                    </div>
                </Row>
            )}
            <Row className="mb-1">
                <Label for="XP" className="py-0" sm={5}>
                    <b>Starting XP</b>
                </Label>
                <Col id="XP">{masterArchetype.experience}</Col>
            </Row>
            <Row className="mb-1">
                <Label for="startingSkills" className="py-0" sm="5">
                    <b>Starting Skills</b>
                </Label>
                <ArchetypeSkills id="startingSkills" />
            </Row>
            <Row className="mb-1">
                <Label for="startingTalents" className="py-0" sm="5">
                    <b>Starting Talents</b>
                </Label>
            </Row>
            {masterArchetype.talents &&
                masterArchetype.talents.map(
                    talent =>
                        archetypeTalents[talent] && (
                            <Col sm={12} id="startingTalents" key={talent}>
                                <Row>
                                    <Label
                                        for={talent}
                                        className="py-0"
                                        sm="5"
                                    >
                                        <b>
                                            {archetypeTalents[talent].name}
                                        </b>
                                    </Label>
                                    <Col id={talent}>
                                        <Description
                                            text={
                                                archetypeTalents[talent]
                                                    .description
                                            }
                                        />
                                    </Col>
                                </Row>
                                {archetypeTalents[talent].modifier &&
                                    archetypeTalents[talent].modifier
                                        .archetypeTalents && (
                                        <Row>
                                            <Label
                                                for="selector"
                                                className="py-0"
                                                sm="5"
                                            >
                                                <b>Select One</b>
                                            </Label>
                                            <Col>
                                                <Input
                                                    id="selector"
                                                    type="select"
                                                    bsSize="sm"
                                                    value={
                                                        misc
                                                            ? misc.archetypeTalents
                                                            : ''
                                                    }
                                                    onChange={handleSelect}
                                                >
                                                    <option value="" />
                                                    {archetypeTalents[
                                                        talent
                                                    ].modifier
                                                        .archetypeTalents &&
                                                        archetypeTalents[
                                                            talent
                                                        ].modifier.archetypeTalents
                                                            .sort()
                                                            .map(key => (
                                                                <option
                                                                    value={
                                                                        key
                                                                    }
                                                                    key={
                                                                        key
                                                                    }
                                                                >
                                                                    {
                                                                        archetypeTalents[
                                                                            key
                                                                        ]
                                                                            .name
                                                                    }
                                                                </option>
                                                            ))}
                                                </Input>
                                            </Col>
                                        </Row>
                                    )}
                            </Col>
                        )
                )}
            <Row className="mb-1">
                <Label for="setting" className="py-0" sm="5">
                    <b>Setting</b>
                </Label>
                <Col id="setting">
                    {Array.isArray(masterArchetype.setting)
                        ? masterArchetype.setting.sort().join(', ')
                        : masterArchetype.setting}
                </Col>
            </Row>
            {masterArchetype.book && (
                <Row className="mb-1">
                    <Label for="book" className="py-0" sm="5">
                        <b>Book</b>
                    </Label>
                    <Col id="book">
                        <Description
                            text={`${masterArchetype.book}: Page ${masterArchetype.page}`}
                        />
                    </Col>
                </Row>
            )}
            <Row className="mb-1">
                <Label for="desc" className="py-0" sm="5">
                    <b>Description</b>
                </Label>
                <Col id="desc">
                    <Description text={masterArchetype.description} />
                </Col>
            </Row>
        </div>
    );
};

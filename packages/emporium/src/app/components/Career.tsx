import { changeData } from '@emporium/actions';
import { maxCareerSkills as maxCareerSkillsSelector } from '@emporium/selectors';
import { get } from 'lodash-es';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Description } from './Description';

interface CareerProps {
    modal: boolean;
    handleClose: () => void;
}

export const Career = ({ modal, handleClose }: CareerProps) => {
    const dispatch = useDispatch();
    const archetype = useSelector((state: any) => state.archetype);
    const archetypes = useSelector((state: any) => state.archetypes);
    const career = useSelector((state: any) => state.career);
    const careerSkillsRank = useSelector((state: any) => state.careerSkillsRank);
    const careers = useSelector((state: any) => state.careers);
    const skills = useSelector((state: any) => state.skills);
    const maxCareerSkills = useSelector((state: any) => maxCareerSkillsSelector(state));
    const theme = useSelector((state: any) => state.theme);
    const archetypeSpecialSkills = useSelector((state: any) => state.archetypeSpecialSkills);

    const masterCareer = useMemo(() => careers[career], [careers, career]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const skill = Object.keys(archetypeSpecialSkills || {}).filter(
                key => careers[event.target.value].skills.includes(key) && key
            );
            if (skill.length > 0 && archetype === 'AverageHuman') {
                alert(
                    `${
                        careers[event.target.value].name
                    } career contains ${skill.join(' ')}, which ${get(
                        archetypes,
                        `${archetype}.name`,
                        'your selected Archetype'
                    )} has modified. Please select a different career or change the skill options in Archetype selection`
                );
                return;
            }
            dispatch(changeData(event.target.value, 'career'));
            dispatch(changeData([], 'careerSkillsRank'));
            event.preventDefault();
        },
        [archetypeSpecialSkills, careers, archetype, archetypes, dispatch]
    );

    const handleCheck = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const arr = [...careerSkillsRank];
            if (arr.includes(event.target.name)) {
                arr.forEach((skill, index) => {
                    if (arr[index] === event.target.name) {
                        arr.splice(index, 1);
                    }
                });
            } else {
                arr.push(event.target.name);
            }
            if (maxCareerSkills >= arr.length) {
                dispatch(changeData(arr, 'careerSkillsRank'));
            } else {
                event.preventDefault();
            }
        },
        [careerSkillsRank, maxCareerSkills, dispatch]
    );

    return (
        <Modal
            className={`body-${theme}`}
            isOpen={modal}
            toggle={handleClose}
        >
            <ModalHeader toggle={handleClose}>
                <b>Select Career</b>
            </ModalHeader>
            <ModalBody>
                <Input
                    type="select"
                    bsSize="sm"
                    value={masterCareer ? masterCareer.name : ''}
                    onChange={handleChange}
                >
                    <option value={null} />
                    {Object.keys(careers)
                        .sort()
                        .map(key => (
                            <option value={key} key={key}>
                                {careers[key].name}
                            </option>
                        ))}
                </Input>
                <hr />

                {masterCareer && (
                    <ModalBody>
                        <Row>
                            <h5>Career Skills</h5>
                        </Row>
                        <Row>
                            Select {maxCareerSkills} skills to
                            start with 1 free rank
                        </Row>
                        {masterCareer.skills.sort().map(skill => (
                            <Row
                                key={skill}
                                className="ml-3 align-items-center"
                            >
                                <FormGroup check>
                                    <Input
                                        type="checkbox"
                                        name={skill}
                                        id={skill}
                                        className="my-2"
                                        checked={careerSkillsRank.includes(
                                            skill
                                        )}
                                        onChange={handleCheck}
                                    />
                                    <Label id={skill} check>
                                        {skills[skill]
                                            ? skills[skill].name
                                            : 'Skill not found'}
                                    </Label>
                                </FormGroup>
                            </Row>
                        ))}

                        <Row className="mb-1 align-self-center">
                            <Label for="setting" sm="3" className="py-0">
                                <b>Setting</b>
                            </Label>
                            <Col id="setting" sm="auto">
                                {Array.isArray(masterCareer.setting)
                                    ? masterCareer.setting.sort().join(', ')
                                    : masterCareer.setting}
                            </Col>
                        </Row>
                        {masterCareer.book && (
                            <Row className="mb-1 align-self-center">
                                <Label for="book" sm="3" className="py-0">
                                    <b>Book</b>
                                </Label>
                                <Col sm="auto">
                                    <Description
                                        id="book"
                                        text={`${masterCareer.book}: ${masterCareer.page}`}
                                    />
                                </Col>
                            </Row>
                        )}
                        <Row className="mb-1 align-self-center">
                            <Label for="desc" className="py-0" sm="3">
                                <b>Description</b>
                            </Label>
                            <Col sm="auto">
                                <Description
                                    id="desc"
                                    text={masterCareer.description}
                                />
                            </Col>
                        </Row>
                    </ModalBody>
                )}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};

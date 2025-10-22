import { changeData } from '@emporium/actions';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import { SkillRow } from './SkillRow';

interface SkillBlockProps {
    type: string;
}

export const SkillBlock = ({ type }: SkillBlockProps) => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const skills = useSelector((state: any) => state.skills);
    const masterSkills = useSelector((state: any) => state.masterSkills);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newObj = { ...masterSkills };
        if (!newObj[event.target.name]) {
            newObj[event.target.name] = {};
        }
        newObj[event.target.name].hide = !newObj[event.target.name].hide;
        dispatch(changeData(newObj, 'masterSkills'));
    }, [masterSkills, dispatch]);

    return (
        <div>
            <Row>
                <b>{type.toUpperCase()}</b>
                <Button
                    color="link"
                    className="noUnderLine p-0"
                    onClick={() => setModal(true)}
                >
                    ⚙
                </Button>
            </Row>
            <Table className="mx-auto bg-light">
                <thead>
                    <tr>
                        <th className="table-name">Skill</th>
                        <th className="table-career">Career</th>
                        <th className="table-rank">Rank</th>
                        <th className="table-dice">Dice Pool</th>
                    </tr>
                </thead>
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
            <Modal
                isOpen={modal}
                toggle={() => setModal(false)}
            >
                <ModalHeader
                    toggle={() => setModal(false)}
                >{`${type} Skills`}</ModalHeader>
                <ModalBody className="">
                    <Table>
                        <thead>
                            <tr>
                                <th>Show/Hide</th>
                                <th>Skill</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(skills)
                                .sort()
                                .map(
                                    key =>
                                        skills[key].type === type && (
                                            <tr key={key}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        name={key}
                                                        checked={
                                                            masterSkills[
                                                                key
                                                            ]
                                                                ? !masterSkills[
                                                                      key
                                                                  ].hide
                                                                : true
                                                        }
                                                        onChange={
                                                            handleChange
                                                        }
                                                    />
                                                </td>
                                                <td>{skills[key].name}</td>
                                            </tr>
                                        )
                                )}
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => setModal(false)}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

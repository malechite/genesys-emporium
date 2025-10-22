import { changeData } from '@emporium/actions';
import { omit } from 'lodash-es';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ArchetypeStats } from './ArchetypeStats';

interface ArchetypeProps {
    modal: boolean;
    handleClose: () => void;
}

export const Archetype = ({ modal, handleClose }: ArchetypeProps) => {
    const dispatch = useDispatch();
    const archetypes = useSelector((state: any) => state.archetypes);
    const archetype = useSelector((state: any) => state.archetype);
    const misc = useSelector((state: any) => state.misc);
    const theme = useSelector((state: any) => state.theme);

    const handleSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === '' ? null : event.target.value;
        dispatch(changeData(value, 'archetype'));
        dispatch(changeData('', 'archetypeSpecialSkills'));
        dispatch(changeData(omit(misc, 'archetypeTalents'), 'misc', false));
    }, [dispatch, misc]);

    return (
        <Modal
            className={`body-${theme}`}
            isOpen={modal}
            toggle={handleClose}
            style={{ overflowY: 'auto' }}
        >
            <ModalHeader toggle={handleClose}>
                <b>Select Archetype</b>
            </ModalHeader>
            <ModalBody className="mx-2">
                <Input
                    type="select"
                    bsSize="sm"
                    value={archetype ? archetype : ''}
                    onChange={handleSelect}
                >
                    <option value="" />
                    {Object.keys(archetypes)
                        .sort()
                        .map(key => (
                            <option value={key} key={key}>
                                {archetypes[key].name}
                            </option>
                        ))}
                </Input>
                <ArchetypeStats />
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};

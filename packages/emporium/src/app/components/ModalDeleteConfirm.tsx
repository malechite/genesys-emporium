import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

interface ModalDeleteConfirmProps {
    deleteModal: boolean;
    confirmedDelete: () => void;
    handleClose: () => void;
    type: string;
}

export const ModalDeleteConfirm = ({ deleteModal, confirmedDelete, handleClose, type }: ModalDeleteConfirmProps) => {
    const theme = useSelector((state: any) => state.theme);

    return (
        <Modal
            className={`body-${theme}`}
            isOpen={deleteModal}
            toggle={handleClose}
        >
            <ModalHeader>BALETEED WARNING</ModalHeader>
            <ModalBody>
                Are you super serious? This cannot be undone!
            </ModalBody>
            <ModalFooter>
                <ButtonGroup>
                    <Button onClick={handleClose}>NO!</Button>
                    <Button
                        color="danger"
                        onClick={confirmedDelete}
                    >{`YES! I no longer want this
                            ${type}!`}</Button>
                </ButtonGroup>
            </ModalFooter>
        </Modal>
    );
};

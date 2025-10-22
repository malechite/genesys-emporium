import { changeData } from '@emporium/actions';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

interface XPPopupProps {
    modal: boolean;
    handleClose: () => void;
}

export const XPPopup = ({ modal, handleClose }: XPPopupProps) => {
    const dispatch = useDispatch();
    const earnedXPFromState = useSelector((state: any) => state.earnedXP);
    const theme = useSelector((state: any) => state.theme);
    const [earnedXP, setEarnedXP] = useState(earnedXPFromState);

    const handleChange = useCallback((event: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement>) => {
        let xp: string | number = (event.target as HTMLButtonElement | HTMLInputElement).value;
        if (+xp > 9999) {
            return;
        }
        if (typeof xp === 'string' && xp.includes('+')) {
            xp = +xp.replace(/\D+/g, '') + +earnedXP;
        }
        setEarnedXP(+xp);
        event.preventDefault();
    }, [earnedXP]);

    const handleSubmit = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(changeData(earnedXP, 'earnedXP'));
        handleClose();
        event.preventDefault();
    }, [earnedXP, dispatch, handleClose]);

    return (
        <Modal
            className={`body-${theme}`}
            isOpen={modal}
            toggle={handleClose}
        >
            <ModalHeader
                toggle={handleClose}
            >{`Earned XP:  ${earnedXP}`}</ModalHeader>
            <ModalBody className="m-4">
                <Row className="my-2">
                    <input
                        type="number"
                        value={earnedXP > 0 ? earnedXP : ''}
                        onChange={handleChange}
                    />
                </Row>
                <Row className="my-2">
                    <ButtonGroup>
                        <Button value="+5" onClick={handleChange}>
                            +5
                        </Button>
                        <Button value="+10" onClick={handleChange}>
                            +10
                        </Button>
                        <Button onClick={handleSubmit}>Enter</Button>
                    </ButtonGroup>
                </Row>
            </ModalBody>
        </Modal>
    );
};

import { changeData } from '@emporium/actions';
import * as images from '@emporium/images';
import React, { useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

interface CharacterImageProps {}

export const CharacterImage = ({}: CharacterImageProps) => {
    const dispatch = useDispatch() as any;
    const description = useSelector((state: any) => state.description);
    const theme = useSelector((state: any) => state.theme);

    const [modal, setModal] = useState(false);
    const [text, setText] = useState(description.image);
    const imgRef = useRef<HTMLImageElement>(null);

    const handleBlur = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            const obj = { ...description };
            obj.image = text;
            dispatch(changeData(obj, 'description'));
            event.preventDefault();
        },
        [description, text, dispatch]
    );

    const handleImageError = useCallback(() => {
        if (imgRef.current) {
            imgRef.current.src = images.user;
        }
    }, []);

    return (
        <div className="align-items-center m-auto">
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>
                    CHARACTER IMAGE
                </div>
                <Button
                    color="link"
                    className="noUnderLine p-0"
                    onClick={() => setModal(true)}
                >
                    ⚙
                </Button>
            </Row>
            <hr />
            <Row className="justify-content-center">
                <img
                    className="characterImage m-1 w-100 h-100"
                    src={description.image ? description.image : ''}
                    alt="not found"
                    ref={imgRef}
                    onError={handleImageError}
                />
            </Row>
            <Modal
                className={`body-${theme}`}
                isOpen={modal !== false}
                toggle={() => setModal(false)}
            >
                <ModalHeader toggle={() => setModal(false)}>
                    Edit Character Image
                </ModalHeader>
                <ModalBody className="m-3">
                    <div>
                        <Row>CHARACTER IMAGE URL:</Row>
                        <Input
                            type="text"
                            value={text}
                            onBlur={handleBlur}
                            onChange={event => setText(event.target.value)}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => setModal(false)}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

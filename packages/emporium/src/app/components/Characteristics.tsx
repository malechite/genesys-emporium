import { changeData } from '@emporium/actions';
import { chars } from '@emporium/data-lists';
import * as images from '@emporium/images';
import { characteristics as characteristicsSelector } from '@emporium/selectors';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

interface CharacteristicsProps {
    modal: boolean;
    handleClose: () => void;
}

export const Characteristics = ({ modal, handleClose }: CharacteristicsProps) => {
    const dispatch = useDispatch();
    const archetype = useSelector((state: any) => state.archetype);
    const archetypes = useSelector((state: any) => state.archetypes);
    const creationCharacteristics = useSelector((state: any) => state.creationCharacteristics);
    const theme = useSelector((state: any) => state.theme);
    const characteristics = useSelector(characteristicsSelector);

    const countXP = useMemo(() => {
        let xp = 0;
        if (!archetype || !archetypes[archetype]) {
            return 0;
        }

        const startingCharacteristics = archetypes[archetype];

        Object.keys(creationCharacteristics).forEach(characteristic => {
            const points = creationCharacteristics[characteristic];
            for (let i = 0; points > i; i++) {
                xp += (startingCharacteristics[characteristic] + i + 1) * 10;
            }
        });
        return xp;
    }, [archetype, archetypes, creationCharacteristics]);

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const newObj = { ...creationCharacteristics };
        const characteristic = (event.target as HTMLButtonElement).value;
        const buttonName = (event.target as HTMLButtonElement).name;

        if (buttonName === 'Up') {
            if (characteristics[characteristic] >= 5) {
                alert(`You have maxed out ${characteristic}`);
                return;
            }
            newObj[characteristic]++;
        }
        if (buttonName === 'Down') {
            if (0 >= creationCharacteristics[characteristic]) {
                alert(`${characteristic} cannot be decreased further`);
                return;
            }
            newObj[characteristic]--;
        }
        dispatch(changeData(newObj, 'creationCharacteristics'));
    }, [creationCharacteristics, characteristics, dispatch]);

    return (
        <Modal
            className={`body-${theme}`}
            isOpen={modal}
            toggle={handleClose}
        >
            <ModalHeader toggle={handleClose}>
                Modify Characteristics
            </ModalHeader>
            <ModalBody className="m-1 text-left">
                <Row>Total XP: {countXP}</Row>
                <Row className="justify-content-center">
                    {chars.map(stat => (
                        <div key={stat} className="m-2 text-center">
                            <div
                                className={`imageBox characteristic characteristic-${stat}`}
                            >
                                <img
                                    src={images[theme][stat]}
                                    alt=""
                                    className="svg"
                                />
                                <Row
                                    className={`characteristicValue characteristicValue-${theme}`}
                                >
                                    {characteristics[stat]}
                                </Row>
                            </div>
                            <ButtonGroup>
                                <Button
                                    value={stat}
                                    name="Up"
                                    onClick={handleClick}
                                >
                                    ↑
                                </Button>
                                <Button
                                    value={stat}
                                    name="Down"
                                    onClick={handleClick}
                                >
                                    ↓
                                </Button>
                            </ButtonGroup>
                        </div>
                    ))}
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleClose}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

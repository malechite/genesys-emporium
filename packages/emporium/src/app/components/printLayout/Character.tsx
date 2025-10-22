import * as images from '@emporium/images';
import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';

interface CharacterProps {}

export const Character = () => {
    const archetype = useSelector((state: any) => state.archetype);
    const archetypes = useSelector((state: any) => state.archetypes);
    const career = useSelector((state: any) => state.career);
    const careers = useSelector((state: any) => state.careers);
    const characterList = useSelector((state: any) => state.characterList);
    const character = useSelector((state: any) => state.character);
    const description = useSelector((state: any) => state.description);
    const setting = useSelector((state: any) => state.setting);
    const theme = useSelector((state: any) => state.theme);

    return (
        <div>
            <Row>
                <Col md="8">
                    <Row className="justify-content-end align-items-center">
                        <div className={`header header-${theme}`}>
                            CHARACTER
                        </div>
                    </Row>
                    <hr />
                    <Row className="align-items-center">
                        <Col>
                            <b className="mx-2">CHARACTER:</b>
                            {characterList[character]}
                        </Col>
                    </Row>
                    <hr />
                    <Row className="align-items-start">
                        <Col>
                            <b className="mx-2">ARCHETYPE:</b>
                            {archetype === null
                                ? ''
                                : archetypes[archetype]
                                ? archetypes[archetype].name
                                : 'Missing Archetype Data'}
                        </Col>
                        <Col>
                            <b className="mx-2">CAREER:</b>
                            {career === null
                                ? ''
                                : careers[career]
                                ? careers[career].name
                                : 'Missing Career Data'}
                        </Col>
                    </Row>
                    <hr />
                    <Row className="align-items-start">
                        <Col>
                            <b className="mx-2">SETTING:</b>
                            {setting.join(', ')}
                        </Col>
                        <Col>
                            <b className="mx-2">PLAYER:</b>
                            {description.playerName}
                        </Col>
                    </Row>
                </Col>
                <Col className="text-right">
                    <img
                        className="img-fluid text-right w-60"
                        src={images[theme].Logo}
                        alt=""
                    />
                </Col>
            </Row>
        </div>
    );
};

import {
  addCharacter,
  changeCharacter,
  changeCharacterName,
  changeData,
  deleteCharacter,
  loadData
} from '@emporium/actions';
import React, { useCallback, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Col, Input, Label, Row } from 'reactstrap';
import { Archetype } from './Archetype';
import { Career } from './Career';
import { ModalDeleteConfirm } from './ModalDeleteConfirm';

interface CharacterSelectProps {}

export const CharacterSelect = ({}: CharacterSelectProps) => {
    const dispatch = useDispatch();
    const archetype = useSelector((state: any) => state.archetype);
    const archetypes = useSelector((state: any) => state.archetypes);
    const career = useSelector((state: any) => state.career);
    const careers = useSelector((state: any) => state.careers);
    const character = useSelector((state: any) => state.character);
    const characterList = useSelector((state: any) => state.characterList);
    const description = useSelector((state: any) => state.description);
    const settingValue = useSelector((state: any) => state.setting);
    const settings = useSelector((state: any) => state.settings);
    const theme = useSelector((state: any) => state.theme);

    const [name, setName] = useState(
        characterList ? characterList[character] : ''
    );
    const [playerName, setPlayerName] = useState(description.playerName);
    const [setting, setSetting] = useState(settingValue);
    const [archetypeModal, setArchetypeModal] = useState(false);
    const [careerModal, setCareerModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const handleSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeCharacter(event.target.value));
        dispatch(loadData());
        event.preventDefault();
    }, [dispatch]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'playerName') {
            setPlayerName(value);
        }
        event.preventDefault();
    }, []);

    const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        const type = event.target.name;
        const newObj = { ...description };
        if (type === 'name') {
            newObj[type] = name;
        } else if (type === 'playerName') {
            newObj[type] = playerName;
        }
        dispatch(changeData(newObj, 'description'));
        event.preventDefault();
    }, [description, name, playerName, dispatch]);

    const confirmedDelete = useCallback((event: React.MouseEvent) => {
        dispatch(deleteCharacter());
        setDeleteModal(false);
        event.preventDefault();
    }, [dispatch]);

    return (
        <div className="w-100">
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>CHARACTER</div>
            </Row>
            <hr />
            <Row className="align-items-center justify-content-between">
                <Col>
                    <Input
                        type="select"
                        bsSize="sm"
                        value={character}
                        onChange={handleSelect}
                    >
                        {characterList &&
                            Object.keys(characterList)
                                .sort((a, b) =>
                                    characterList[a] > characterList[b]
                                        ? 1
                                        : -1
                                )
                                .map(key => (
                                    <option value={key} key={key}>
                                        {characterList[key]}
                                    </option>
                                ))}
                    </Input>
                </Col>
                <Col className="d-flex justify-content-end">
                    <ButtonGroup>
                        <Button
                            onClick={() => dispatch(addCharacter())}
                        >
                            New
                        </Button>
                        <Button
                            onClick={() =>
                                setDeleteModal(true)
                            }
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <hr />
            <Row className="align-items-center">
                <Label for="characterName" sm={4}>
                    <b>CHARACTER NAME</b>
                </Label>
                <Col className="m-auto" id="characterName">
                    <Input
                        type="text"
                        bsSize="sm"
                        value={name ? name : ''}
                        maxLength="50"
                        name="name"
                        onChange={handleChange}
                        onBlur={() => dispatch(changeCharacterName(name))}
                    />
                </Col>
            </Row>
            <hr />
            <Row className="align-items-center justify-content-between">
                <Label for="archetype" sm={4}>
                    <b>ARCHETYPE</b>
                </Label>
                <Col id="archetype">
                    {archetype && archetypes[archetype]
                        ? archetypes[archetype].name
                        : 'Missing Archetype Data'}
                </Col>
                <Col className="text-right">
                    <Button
                        name="archetype"
                        onClick={() =>
                            setArchetypeModal(true)
                        }
                    >
                        Select
                    </Button>
                </Col>
            </Row>
            <hr />
            <Row className="align-items-center justify-content-between">
                <Label for="career" sm="4">
                    <b>CAREER</b>
                </Label>
                <Col id="career">
                    {career && careers[career]
                        ? careers[career].name
                        : 'Missing Career Data'}
                </Col>
                <Col className="text-right">
                    <Button
                        name="career"
                        onClick={() => setCareerModal(true)}
                    >
                        Select
                    </Button>
                </Col>
            </Row>
            <hr />
            <Row className="align-items-center">
                <Label for="setting" sm="4">
                    <b>SETTING</b>
                </Label>
                <Col id="setting">
                    <Typeahead
                        id="characterSettingChoice"
                        multiple={true}
                        options={Object.values(settings)}
                        name="setting"
                        selected={setting}
                        placeholder="Choose a Setting..."
                        clearButton={true}
                        onChange={selected =>
                            setSetting(
                                selected.includes('All')
                                    ? ['All']
                                    : selected
                            )
                        }
                        onBlur={() => dispatch(changeData(setting, 'setting', false))}
                    />
                </Col>
            </Row>
            <hr />
            <Row className="align-items-center">
                <Col sm="4">
                    <b>PLAYER NAME</b>
                </Col>
                <Col className="m-auto">
                    <Input
                        type="text"
                        bsSize="sm"
                        value={playerName}
                        maxLength="25"
                        name="playerName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Col>
            </Row>
            <hr />
            <Archetype
                modal={archetypeModal}
                handleClose={() => setArchetypeModal(false)}
            />
            <Career
                modal={careerModal}
                handleClose={() => setCareerModal(false)}
            />
            <ModalDeleteConfirm
                deleteModal={deleteModal}
                confirmedDelete={confirmedDelete}
                handleClose={() => setDeleteModal(false)}
                type="Character"
            />
        </div>
    );
};

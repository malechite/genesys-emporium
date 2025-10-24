import { addDataSet, modifyDataSet, removeDataSet } from '@emporium/actions';
import { chars } from '@emporium/data-lists';
import * as images from '@emporium/images';
import { upperFirst } from 'lodash-es';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Col, Row, Table } from 'reactstrap';
import { Fragment } from './Fragments';
import DeleteButton from '../DeleteButton';
import ControlButtonSet from '../ControlButtonSet';

const attributes = { Wounds: 'woundThreshold', Strain: 'strainThreshold' };

interface CustomArchetypesProps {
    handleClose?: () => void;
}

const initialState = {
    name: '',
    Brawn: 2,
    Agility: 2,
    Intellect: 2,
    Cunning: 2,
    Willpower: 2,
    Presence: 2,
    woundThreshold: 10,
    strainThreshold: 10,
    experience: 100,
    freeSkillRanks: {},
    description: '',
    setting: [],
    archetypeTalents: [],
    mode: 'add'
};

export const CustomArchetypes = ({ handleClose }: CustomArchetypesProps) => {
    const dispatch = useDispatch() as any;
    const customArchetypes = useSelector(
        (state: any) => state.customArchetypes
    );
    const archetypeTalents = useSelector(
        (state: any) => state.archetypeTalents
    );
    const skills = useSelector((state: any) => state.skills);
    const theme = useSelector((state: any) => state.theme);

    const [state, setState] = useState<any>(initialState);

    const {
        name,
        freeSkillRanks,
        experience,
        description,
        archetypeTalents: selectedArchetypeTalents,
        setting,
        mode
    } = state;

    const initState = useCallback(() => {
        setState(initialState);
    }, []);

    const handleClick = useCallback(
        (event: any) => {
            const value = +state[event.target.name] + +event.target.value;
            if (chars.includes(event.target.name) && value > 5) {
                alert(`Cannot set ${event.target.name} to ${value}`);
                return;
            }

            if (0 >= value) {
                alert(`Cannot set ${event.target.name} to ${value}`);
                return;
            }

            setState((prev: any) => ({ ...prev, [event.target.name]: value }));
        },
        [state]
    );

    const handleSkillSelect = useCallback((event: any) => {
        const skill = event.target.value;
        setState((prev: any) => {
            const obj = { ...prev.freeSkillRanks };
            obj[skill] ? obj[skill]++ : (obj[skill] = 1);
            return { ...prev, freeSkillRanks: obj };
        });
        event.preventDefault();
    }, []);

    const handleDuplicate = useCallback(
        (event: any) => {
            const { id, ...data } = { ...customArchetypes[event.target.name] };
            dispatch(
                addDataSet('customArchetypes', {
                    ...data,
                    name: `${data.name} (copy)`
                })
            );
            event.preventDefault();
        },
        [customArchetypes, dispatch]
    );

    const handleSubmit = useCallback(() => {
        const { freeSkillRanks, archetypeTalents, mode, ...rest } = state;
        const data = {
            ...rest,
            skills: { ...freeSkillRanks },
            talents: [...archetypeTalents]
        };

        if (mode === 'add') {
            dispatch(addDataSet('customArchetypes', data));
        } else if (mode === 'edit') {
            dispatch(modifyDataSet('customArchetypes', data));
        }

        initState();
    }, [state, dispatch, initState]);

    const handleEdit = useCallback(
        (event: any) => {
            const archetype = customArchetypes[event.target.name];
            setState({
                freeSkillRanks: archetype.skills ? archetype.skills : {},
                archetypeTalents: archetype.talents ? archetype.talents : [],
                setting:
                    typeof archetype.setting === 'string'
                        ? archetype.setting.split(', ')
                        : archetype.setting,
                ...archetype,
                mode: 'edit'
            });
        },
        [customArchetypes]
    );

    const handleDelete = useCallback(
        (event: any) => {
            dispatch(
                removeDataSet(
                    'customArchetypes',
                    customArchetypes[event.target.name].id
                )
            );
            event.preventDefault();
        },
        [customArchetypes, dispatch]
    );

    const handleCloseWrapper = useCallback(() => {
        initState();
        handleClose();
    }, [initState, handleClose]);

    return (
        <div>
            <Fragment
                type="text"
                title="name"
                value={name}
                mode={mode}
                handleChange={event =>
                    setState((prev: any) => ({
                        ...prev,
                        name: event.target.value
                    }))
                }
            />

            <Fragment
                type="number"
                title="experience"
                value={experience}
                handleChange={event =>
                    setState((prev: any) => ({
                        ...prev,
                        experience: event.target.value
                    }))
                }
            />

            <Fragment
                type="setting"
                setting={setting}
                setState={selected =>
                    setState((prev: any) => ({ ...prev, setting: selected }))
                }
            />

            <Row className="mt-2">
                <Col sm="2" className="my-auto">
                    <b className="text-left">Starting Characteristics</b>
                </Col>
                <Col>
                    {chars.map(stat => (
                        <div
                            key={stat}
                            className="m-2 text-center d-inline-block"
                        >
                            <div
                                className={`imageBox characteristic characteristic-${stat} m-auto`}
                            >
                                <img
                                    src={images[theme][stat]}
                                    alt=""
                                    className="svg"
                                />
                                <Row
                                    className={`characteristicValue characteristicValue-${theme}`}
                                >
                                    {state[stat]}
                                </Row>
                            </div>
                            <ButtonGroup>
                                <Button
                                    name={stat}
                                    value={1}
                                    onClick={handleClick}
                                >
                                    ↑
                                </Button>
                                <Button
                                    name={stat}
                                    value={-1}
                                    onClick={handleClick}
                                >
                                    ↓
                                </Button>
                            </ButtonGroup>
                        </div>
                    ))}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col sm="2" className="my-auto">
                    <b className="text-left">Starting Attributes</b>
                </Col>
                <Col>
                    {['Wounds', 'Strain'].map(type => (
                        <div
                            className="m-2 text-center d-inline-block"
                            key={type}
                        >
                            <div
                                className={`imageBox attribute attribute-${upperFirst(
                                    type
                                )}Threshold`}
                            >
                                <img
                                    src={
                                        images[theme][
                                            `${upperFirst(type)}Threshold`
                                        ]
                                    }
                                    alt=""
                                    className="svg"
                                />
                                <Row
                                    className={`attributeValue attributeValue-${theme}-${upperFirst(
                                        type
                                    )}Threshold`}
                                >
                                    {state[attributes[type]]}
                                </Row>
                            </div>
                            <ButtonGroup>
                                <Button
                                    name={attributes[type]}
                                    value={1}
                                    onClick={handleClick}
                                >
                                    ↑
                                </Button>
                                <Button
                                    name={attributes[type]}
                                    value={-1}
                                    onClick={handleClick}
                                >
                                    ↓
                                </Button>
                            </ButtonGroup>
                        </div>
                    ))}
                </Col>
            </Row>

            <Fragment
                name="freeSkillRanks"
                type="inputSelect"
                array={[
                    ...Object.keys(skills),
                    ...(Object.keys(freeSkillRanks).includes('choice')
                        ? ['any', 'choice']
                        : ['choice'])
                ]}
                nameObj={skills}
                handleChange={handleSkillSelect}
            />

            <Fragment
                type="list"
                array={Object.keys(freeSkillRanks)}
                object={freeSkillRanks}
                nameObj={skills}
                handleClear={() =>
                    setState((prev: any) => ({ ...prev, freeSkillRanks: {} }))
                }
            />

            <Fragment
                name="archetypeTalents"
                type="inputSelect"
                array={Object.keys(archetypeTalents)
                    .filter(key => !selectedArchetypeTalents.includes(key))
                    .sort()}
                nameObj={archetypeTalents}
                handleChange={event =>
                    setState((prev: any) => ({
                        ...prev,
                        archetypeTalents: [
                            ...prev.archetypeTalents,
                            event.target.value
                        ]
                    }))
                }
            />

            <Fragment
                type="list"
                array={selectedArchetypeTalents.sort()}
                nameObj={archetypeTalents}
                handleClear={() =>
                    setState((prev: any) => ({ ...prev, archetypeTalents: [] }))
                }
            />

            <Fragment
                type="description"
                value={description}
                handleChange={event =>
                    setState((prev: any) => ({
                        ...prev,
                        description: event.target.value
                    }))
                }
            />

            <ControlButtonSet
                mode={mode}
                type={'Archetype'}
                handleSubmit={handleSubmit}
                onEditSubmit={handleSubmit}
                onEditCancel={initState}
                disabled={name === ''}
            />

            <Table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {customArchetypes &&
                        Object.keys(customArchetypes)
                            .sort((a, b) =>
                                customArchetypes[a].name >
                                customArchetypes[b].name
                                    ? 1
                                    : -1
                            )
                            .map(key => (
                                <tr key={key}>
                                    <td>{customArchetypes[key].name}</td>
                                    <td className="text-right">
                                        <ButtonGroup>
                                            <Button
                                                name={key}
                                                onClick={handleEdit}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                name={key}
                                                onClick={handleDuplicate}
                                            >
                                                Duplicate
                                            </Button>
                                            <DeleteButton
                                                name={key}
                                                onClick={handleDelete}
                                            />
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            ))}
                </tbody>
            </Table>
        </div>
    );
};

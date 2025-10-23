import {
    addDataSet,
    changeDocData,
    changeFieldData,
    changeReduxState,
    loadDoc,
    removeDataSet
} from '@emporium/actions';
import * as images from '@emporium/images';
import { get, upperCase } from 'lodash-es';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Col, Input, Label, Row } from 'reactstrap';
import { ModalDeleteConfirm } from './ModalDeleteConfirm';

interface VehicleSelectProps {}

export const VehicleSelect = ({}: VehicleSelectProps) => {
    const dispatch = useDispatch();

    // Redux state
    const user = useSelector((state: any) => state.user);
    const theme = useSelector((state: any) => state.theme);
    const vehicle = useSelector((state: any) => state.vehicle);
    const vehicles = useSelector((state: any) => state.vehicles);
    const vehicleDataSet = useSelector((state: any) => state.vehicleDataSet);
    const vehicleType = useSelector((state: any) => state.vehicleType);
    const currentHullTrauma = useSelector((state: any) => state.currentHullTrauma);
    const currentSystemStrain = useSelector((state: any) => state.currentSystemStrain);
    const vehicleNotes = useSelector((state: any) => state.vehicleNotes);

    // Local state
    const [currentSystemStrainState, setCurrentSystemStrainState] = useState(currentSystemStrain);
    const [currentHullTraumaState, setCurrentHullTraumaState] = useState(currentHullTrauma);
    const [vehicleNotesState, setVehicleNotesState] = useState(vehicleNotes);
    const [deleteModal, setDeleteModal] = useState(false);
    const [name, setName] = useState(get(vehicleDataSet, `${vehicle}.name`, ''));
    const [writeAccess, setWriteAccess] = useState(
        get(vehicleDataSet, `${vehicle}.write`, []).includes(user)
    );

    useEffect(() => {
        dispatch(loadDoc('vehicle', vehicle));
    }, [dispatch, vehicle]);

    useEffect(() => {
        if (vehicle) {
            setName(get(vehicleDataSet, `${vehicle}.name`, ''));
            setWriteAccess(
                get(vehicleDataSet, `${vehicle}.write`, []).includes(user)
            );
        }
    }, [vehicle, vehicleDataSet, user]);

    useEffect(() => {
        setCurrentHullTraumaState(currentHullTrauma);
    }, [currentHullTrauma]);

    useEffect(() => {
        setCurrentSystemStrainState(currentSystemStrain);
    }, [currentSystemStrain]);

    useEffect(() => {
        setVehicleNotesState(vehicleNotes);
    }, [vehicleNotes]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        let value: string | number = event.target.value;
        if (event.target.id.indexOf('number') === 0) {
            value = +value;
        }

        const name = event.target.name;
        if (name === 'currentSystemStrain') {
            setCurrentSystemStrainState(value as number);
        } else if (name === 'currentHullTrauma') {
            setCurrentHullTraumaState(value as number);
        } else if (name === 'vehicleNotes') {
            setVehicleNotesState(value as string);
        } else if (name === 'name') {
            setName(value as string);
        }
    }, []);

    const handleSubmit = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        event.preventDefault();
        let { value, name, id } = event.target;
        let finalValue: string | number = value;
        if (id.indexOf('number') === 0) {
            finalValue = +value;
        }

        dispatch(changeDocData('vehicle', vehicle, name, finalValue));
    }, [dispatch, vehicle]);

    const handleSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        loadVehicleData(event.target.value);
    }, []);

    const loadVehicleData = useCallback((id: string) => {
        dispatch(changeReduxState(id, 'vehicle'));
    }, [dispatch]);

    const confirmedDelete = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(removeDataSet('vehicle', vehicle));
        setDeleteModal(false);
        event.preventDefault();
    }, [dispatch, vehicle]);

    return (
        <div>
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>VEHICLES</div>
            </Row>
            <hr />
            <Row className="align-items-center">
                <Label sm={2}>
                    <b>VEHICLE</b>
                </Label>
                <Col sm={4}>
                    <Input
                        type="select"
                        bsSize="sm"
                        disabled={0 >= Object.keys(vehicleDataSet).length}
                        value={vehicle}
                        onChange={handleSelect}
                    >
                        {Object.keys(vehicleDataSet).map(key => (
                            <option value={key} key={key}>
                                {vehicleDataSet[key].name
                                    ? vehicleDataSet[key].name
                                    : 'Unnamed Vehicle'}
                            </option>
                        ))}
                    </Input>
                </Col>
                <Col sm={2}>
                    <ButtonGroup>
                        <Button onClick={() => dispatch(addDataSet('vehicle'))}>
                            New
                        </Button>
                        <Button
                            disabled={!vehicle || !writeAccess}
                            onClick={() => setDeleteModal(true)}
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <hr />
            {!writeAccess && (
                <Row>
                    <b>READ-ONLY</b>
                </Row>
            )}
            <Row>
                <Label sm={2}>
                    <b>NAME</b>
                </Label>
                <Col sm={6}>
                    <Input
                        type="text"
                        name="name"
                        bsSize="sm"
                        disabled={!vehicle || !writeAccess}
                        value={name ? name : ''}
                        maxLength="50"
                        onChange={handleChange}
                        onBlur={() =>
                            dispatch(changeFieldData(
                                'vehicle',
                                vehicle,
                                name,
                                'name'
                            ))
                        }
                    />
                </Col>
            </Row>
            <hr />
            <Row className="align-items-center">
                <Label sm={2}>
                    <b>TYPE</b>
                </Label>
                <Col sm={6}>
                    <Input
                        type="select"
                        bsSize="sm"
                        disabled={!vehicle || !writeAccess}
                        name="vehicleType"
                        value={vehicleType}
                        onChange={handleSubmit}
                    >
                        <option value="" />
                        {vehicles &&
                            Object.keys(vehicles).map(key => (
                                <option value={key} key={key}>
                                    {vehicles[key].name
                                        ? vehicles[key].name
                                        : 'Unnamed Vehicle'}
                                </option>
                            ))}
                    </Input>
                </Col>
            </Row>
            <hr />
            <div className="VehicleStatBlock justify-content-center">
                <img
                    src={images[theme].VehicleStatBlock}
                    alt=""
                    className="svg"
                />
                {[
                    'silhouette',
                    'maxSpeed',
                    'handling',
                    'defense',
                    'armor',
                    'hullTraumaThreshold',
                    'systemStrainThreshold'
                ].map(type => (
                    <div
                        key={type}
                        className={`vehicleStat vehicleStat-${type}`}
                    >
                        {vehicles[vehicleType] &&
                            vehicles[vehicleType][type]}
                    </div>
                ))}
                {['currentHullTrauma', 'currentSystemStrain'].map(type => (
                    <Input
                        key={type}
                        type="number"
                        bsSize="sm"
                        name={type}
                        id={`number${type}`}
                        maxLength="2"
                        disabled={!vehicle || !writeAccess}
                        className={`vehicleStat vehicleStat-${type} px-1 pt-1`}
                        onChange={handleChange}
                        onBlur={handleSubmit}
                        value={type === 'currentHullTrauma'
                            ? (currentHullTraumaState > 0 ? currentHullTraumaState : '')
                            : (currentSystemStrainState > 0 ? currentSystemStrainState : '')}
                    />
                ))}
            </div>
            {[
                'skill',
                'complement',
                'passengerCapacity',
                'price',
                'rarity',
                'consumables',
                'encumbranceCapacity'
            ].map(type => (
                <Row key={type} className="align-items-center mb-1">
                    <Label for={type} sm="auto">
                        <b>{`${upperCase(type)}:`}</b>
                    </Label>
                    <Col id={type}>
                        {vehicles[vehicleType] &&
                            vehicles[vehicleType][type]}
                    </Col>
                </Row>
            ))}
            <Row className="align-items-top mb-1">
                <Label for={'weapons'} sm="auto">
                    <b>{`WEAPONS:`}</b>
                </Label>
                <Col id={'weapons'} className="text-pre">
                    {vehicles[vehicleType] && vehicles[vehicleType].weapons}
                </Col>
            </Row>
            <Row className="align-items-top mb-1">
                <Label sm="auto" for="features">
                    <b>NOTES</b>
                </Label>
                <Col>
                    <Input
                        onChange={handleChange}
                        onBlur={handleSubmit}
                        type="textarea"
                        rows="12"
                        className="w-100 my-auto"
                        maxLength="1000"
                        name="vehicleNotes"
                        disabled={!vehicle || !writeAccess}
                        id="text"
                        value={vehicleNotesState}
                    />
                </Col>
            </Row>
            <ModalDeleteConfirm
                deleteModal={deleteModal}
                confirmedDelete={confirmedDelete}
                handleClose={() => setDeleteModal(false)}
                type="Vehicle"
            />
        </div>
    );
};

import { addDataSet, modifyDataSet, removeDataSet } from '@emporium/actions';
import { ControlButtonSet, DeleteButton } from '../';
import React, { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { Fragment } from './Fragments';

interface CustomVehiclesProps {
    handleClose?: () => void;
}

export const CustomVehicles = ({ handleClose }: CustomVehiclesProps) => {
    const dispatch = useDispatch() as any;
    const customVehicles = useSelector((state: any) => state.customVehicles);
    const skills = useSelector((state: any) => state.skills);

    const [id, setId] = useState<any>(null);
    const [name, setName] = useState('');
    const [silhouette, setSilhouette] = useState(0);
    const [maxSpeed, setMaxSpeed] = useState(0);
    const [handling, setHandling] = useState(0);
    const [defense, setDefense] = useState(0);
    const [armor, setArmor] = useState(0);
    const [hullTraumaThreshold, setHullTraumaThreshold] = useState(0);
    const [systemStrainThreshold, setSystemStrainThreshold] = useState(0);
    const [skill, setSkill] = useState('');
    const [complement, setComplement] = useState('');
    const [passengerCapacity, setPassengerCapacity] = useState(0);
    const [price, setPrice] = useState(0);
    const [rarity, setRarity] = useState(0);
    const [consumables, setConsumables] = useState('');
    const [encumbranceCapacity, setEncumbranceCapacity] = useState(0);
    const [weapons, setWeapons] = useState('');
    const [setting, setSetting] = useState<any[]>([]);
    const [mode, setMode] = useState('add');

    const _type = 'customVehicles';

    const initState = useCallback(() => {
        setId(null);
        setName('');
        setSilhouette(0);
        setMaxSpeed(0);
        setHandling(0);
        setDefense(0);
        setArmor(0);
        setHullTraumaThreshold(0);
        setSystemStrainThreshold(0);
        setSkill('');
        setComplement('');
        setPassengerCapacity(0);
        setPrice(0);
        setRarity(0);
        setConsumables('');
        setEncumbranceCapacity(0);
        setWeapons('');
        setSetting([]);
        setMode('add');
    }, []);

    const handleCloseModal = useCallback(() => {
        initState();
        handleClose?.();
    }, [initState, handleClose]);

    const handleDuplicate = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const { id = '', ...data } = { ...customVehicles[event.currentTarget.name] };
        dispatch(addDataSet(_type, {
            ...data,
            name: `${data.name} (copy)`
        }));
        event.preventDefault();
    }, [customVehicles, dispatch]);

    const handleSubmit = useCallback((event: React.MouseEvent) => {
        const data = {
            name,
            silhouette,
            maxSpeed,
            handling,
            defense,
            armor,
            hullTraumaThreshold,
            systemStrainThreshold,
            skill,
            complement,
            passengerCapacity,
            price,
            rarity,
            consumables,
            encumbranceCapacity,
            weapons,
            setting
        };
        if (mode === 'add') {
            dispatch(addDataSet(_type, data));
        } else if (mode === 'edit') {
            dispatch(modifyDataSet(_type, { ...data, id }));
        }
        initState();
        event.preventDefault();
    }, [name, silhouette, maxSpeed, handling, defense, armor, hullTraumaThreshold, systemStrainThreshold, skill, complement, passengerCapacity, price, rarity, consumables, encumbranceCapacity, weapons, setting, id, mode, dispatch, initState]);

    const handleDelete = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(removeDataSet(
            _type,
            customVehicles[event.currentTarget.name].id
        ));
        event.preventDefault();
    }, [customVehicles, dispatch]);

    const handleEdit = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const vehicle = customVehicles[event.currentTarget.name];
        setId(vehicle.id);
        setMode('edit');
        setName(vehicle.name);
        setSilhouette(vehicle.silhouette);
        setMaxSpeed(vehicle.maxSpeed);
        setHandling(vehicle.handling);
        setDefense(vehicle.defense);
        setArmor(vehicle.armor);
        setHullTraumaThreshold(vehicle.hullTraumaThreshold);
        setSystemStrainThreshold(vehicle.systemStrainThreshold);
        setSkill(vehicle.skill);
        setComplement(vehicle.complement);
        setPassengerCapacity(vehicle.passengerCapacity);
        setPrice(vehicle.price);
        setRarity(vehicle.rarity);
        setConsumables(vehicle.consumables);
        setEncumbranceCapacity(vehicle.encumbranceCapacity);
        setWeapons(vehicle.weapons);
        setSetting(vehicle.setting);
    }, [customVehicles]);

    const buildField = useCallback((field: string) => {
        const stateMap: Record<string, any> = {
            name,
            silhouette,
            maxSpeed,
            handling,
            defense,
            armor,
            hullTraumaThreshold,
            systemStrainThreshold,
            skill,
            complement,
            passengerCapacity,
            price,
            rarity,
            consumables,
            encumbranceCapacity,
            weapons
        };

        const setterMap: Record<string, (value: any) => void> = {
            name: setName,
            silhouette: setSilhouette,
            maxSpeed: setMaxSpeed,
            handling: setHandling,
            defense: setDefense,
            armor: setArmor,
            hullTraumaThreshold: setHullTraumaThreshold,
            systemStrainThreshold: setSystemStrainThreshold,
            skill: setSkill,
            complement: setComplement,
            passengerCapacity: setPassengerCapacity,
            price: setPrice,
            rarity: setRarity,
            consumables: setConsumables,
            encumbranceCapacity: setEncumbranceCapacity,
            weapons: setWeapons
        };

        switch (field) {
            case 'name':
            case 'consumables':
            case 'complement':
                return (
                    <Fragment
                        key={field}
                        type="text"
                        value={stateMap[field]}
                        title={field}
                        handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setterMap[field](event.target.value)
                        }
                    />
                );
            case 'silhouette':
            case 'maxSpeed':
            case 'handling':
            case 'defense':
            case 'armor':
            case 'hullTraumaThreshold':
            case 'systemStrainThreshold':
            case 'passengerCapacity':
            case 'price':
            case 'encumbranceCapacity':
                return (
                    <Fragment
                        key={field}
                        type="number"
                        value={stateMap[field]}
                        title={field}
                        handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setterMap[field](event.target.value)
                        }
                    />
                );
            case 'skill':
                return (
                    <Fragment
                        key={field}
                        type="inputSelect"
                        name="skill"
                        value={stateMap[field]}
                        array={Object.keys(skills).filter(
                            skillKey => skills[skillKey].type === 'General'
                        )}
                        nameObj={skills}
                        handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setSkill(event.target.value)
                        }
                    />
                );
            case 'rarity':
                return (
                    <Fragment
                        key={field}
                        type="inputSelect"
                        name="rarity"
                        value={stateMap[field]}
                        array={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                        handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setRarity(Number(event.target.value))
                        }
                    />
                );
            case 'weapons':
                return (
                    <Fragment
                        key={field}
                        type="weapons"
                        value={stateMap[field]}
                        handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setWeapons(event.target.value)
                        }
                    />
                );

            default:
                return <div />;
        }
    }, [name, silhouette, maxSpeed, handling, defense, armor, hullTraumaThreshold, systemStrainThreshold, skill, complement, passengerCapacity, price, rarity, consumables, encumbranceCapacity, weapons, skills]);

    const fields = useMemo(() => [
        'name',
        'silhouette',
        'maxSpeed',
        'handling',
        'defense',
        'armor',
        'hullTraumaThreshold',
        'systemStrainThreshold',
        'skill',
        'complement',
        'passengerCapacity',
        'price',
        'rarity',
        'consumables',
        'encumbranceCapacity',
        'weapons'
    ], []);

    return (
        <div>
            {fields.map(field => buildField(field))}
            <Fragment
                type="setting"
                setting={setting}
                setState={(selected: any[]) => setSetting(selected)}
            />
            <ControlButtonSet
                mode={mode}
                type={'Vehicle'}
                handleSubmit={handleSubmit}
                onEditSubmit={handleSubmit}
                onEditCancel={initState}
                disabled={name === ''}
            />
            .
            <Table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(customVehicles)
                        .sort((a, b) =>
                            customVehicles[a].name > customVehicles[b].name
                                ? 1
                                : -1
                        )
                        .map(key => (
                            <tr key={key}>
                                <td>{customVehicles[key].name}</td>
                                <td>
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

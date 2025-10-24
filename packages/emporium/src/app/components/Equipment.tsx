import { changeData } from '@emporium/actions';
import {
    encumbranceLimit,
    equipmentStats,
    gearDice,
    skillDice,
    totalDefense,
    totalEncumbrance,
    totalSoak
} from '@emporium/selectors';
import { DeleteButton } from './';
import clone from 'clone';
import { omit, range } from 'lodash-es';
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Button, Col, Input, Row, Table } from 'reactstrap';
import { Description } from './Description';
import { Gear } from './gear/gear';

interface EquipmentProps {}

export const Equipment = ({}: EquipmentProps) => {
    const dispatch = useDispatch() as any;

    // Redux state
    const armor = useSelector((state: any) => state.armor);
    const craftsmanship = useSelector((state: any) => state.craftsmanship);
    const encumbranceLimitValue = useSelector(encumbranceLimit);
    const equipmentArmor = useSelector((state: any) => state.equipmentArmor);
    const equipmentGear = useSelector((state: any) => state.equipmentGear);
    const equipmentStatsValue = useSelector(equipmentStats);
    const equipmentWeapons = useSelector((state: any) => state.equipmentWeapons);
    const gear = useSelector((state: any) => state.gear);
    const gearDiceValue = useSelector(gearDice) as any;
    const moneyValue = useSelector((state: any) => state.money);
    const aemberValue = useSelector((state: any) => state.aember);
    const qualities = useSelector((state: any) => state.qualities);
    const skillDiceValue = useSelector(skillDice);
    const skills = useSelector((state: any) => state.skills);
    const totalDefenseValue = useSelector(totalDefense);
    const totalEncumbranceValue = useSelector(totalEncumbrance);
    const totalSoakValue = useSelector(totalSoak);
    const weapons = useSelector((state: any) => state.weapons);
    const theme = useSelector((state: any) => state.theme);

    // Local state
    const [money, setMoney] = useState(moneyValue);
    const [aember, setAember] = useState(aemberValue || 0);
    const [equipModal, setEquipModal] = useState<string | boolean>(false);

    useEffect(() => {
        setMoney(moneyValue);
    }, [moneyValue]);

    useEffect(() => {
        setAember(aemberValue || 0);
    }, [aemberValue]);

    const handleChangeMoney = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const number = +event.target.value.replace(/\D+/g, '');
        if (!(number > 9999999999)) {
            setMoney(number);
        }
        event.preventDefault();
    }, []);

    const handleChangeAember = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const number = +event.target.value.replace(/\D+/g, '');
        if (!(number > 9999999999)) {
            setAember(number);
        }
        event.preventDefault();
    }, []);

    const handleStatus = useCallback((type: string, key: string, status: string) => {
        const obj = clone(type === 'equipmentWeapons' ? equipmentWeapons : type === 'equipmentArmor' ? equipmentArmor : equipmentGear);
        if (status === 'carried' && obj[key].equipped) {
            alert(
                `${equipmentStatsValue[key].name} is equipped and cannot be dropped!`
            );
            return;
        }
        if (status === 'equipped' && !obj[key][status]) {
            if (Object.keys(obj).some(key => obj[key].equipped)) {
                alert(
                    `${equipmentStatsValue[key].name} cannot be equipped.  Another piece of armor is already equipped`
                );
                return;
            }
        }
        obj[key][status] = !obj[key][status];
        dispatch(changeData(obj, type));
    }, [dispatch, equipmentWeapons, equipmentArmor, equipmentGear, equipmentStatsValue]);

    const handleSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const equipmentType = event.target.getAttribute('equipmenttype');
        const key = event.target.getAttribute('equipmentkey');
        const obj = clone(equipmentType === 'equipmentWeapons' ? equipmentWeapons : equipmentType === 'equipmentArmor' ? equipmentArmor : equipmentGear);
        obj[key][event.target.name] =
            event.target.name === 'quantity'
                ? +event.target.value
                : event.target.value;
        dispatch(changeData(obj, equipmentType));
    }, [dispatch, equipmentWeapons, equipmentArmor, equipmentGear]);

    const handleDelete = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const type = (event.target as HTMLButtonElement).value;
        const key = (event.target as HTMLButtonElement).name;
        const obj = type === 'equipmentWeapons' ? equipmentWeapons : type === 'equipmentArmor' ? equipmentArmor : equipmentGear;
        dispatch(changeData(omit(obj, key), type, false));
    }, [dispatch, equipmentWeapons, equipmentArmor, equipmentGear]);

    const buttons = useCallback((type: string) => {
        return (
            <Button onClick={() => setEquipModal(type)}>
                Add {type.toString().slice(9)}
            </Button>
        );
    }, []);

    const getLabel = useCallback((type: string, block: string, key: string) => {
        const item = equipmentStatsValue[key];
        if (!item && block !== 'deleteButton') {
            return <td key={key + block}>MissingData</td>;
        }
        switch (block) {
            case 'carried':
            case 'equipped':
                return (
                    <td key={key + block}>
                        <input
                            type="checkbox"
                            className="text-center"
                            checked={equipmentStatsValue[key][block]}
                            onChange={() => handleStatus(type, key, block)}
                        />
                    </td>
                );
            case 'name':
            case 'range':
                return <td key={key + block}>{item[block]}</td>;
            case 'damage':
            case 'critical':
            case 'encumbrance':
            case 'soak':
            case 'defense':
            case 'rangedDefense':
            case 'meleeDefense':
                return (
                    <td key={key + block}>{item[block] ? item[block] : 0}</td>
                );
            case 'skill':
                return (
                    <td key={key + block}>
                        {item.skill
                            ? skills[item.skill]
                                ? skills[item.skill].name
                                : ''
                            : ''}
                    </td>
                );
            case 'qualities':
                return (
                    <td key={key + block}>
                        {item[block] &&
                            Object.keys(item[block])
                                .map(
                                    quality =>
                                        `${
                                            qualities[quality]
                                                ? qualities[quality].name
                                                : 'Quality not found'
                                        } ${item[block][quality]}`
                                )
                                .sort()
                                .join(', ')}
                    </td>
                );
            case 'gearDice':
                return (
                    <td key={key + block}>
                        <Description text={gearDiceValue.weapons[key]} />
                    </td>
                );
            case 'deleteButton':
                return (
                    <td key={key + block}>
                        <DeleteButton
                            name={key}
                            value={type}
                            onClick={handleDelete}
                        />
                    </td>
                );
            case 'craftsmanship':
                return (
                    <td
                        key={key + block}
                        style={{ width: '7em' }}
                        className="p-1"
                    >
                        <Input
                            bsSize="sm"
                            type="select"
                            name="craftsmanship"
                            value={equipmentStatsValue[key].craftsmanship}
                            equipmenttype={type}
                            equipmentkey={key}
                            onChange={handleSelect}
                        >
                            <option value="" />
                            {Object.keys(craftsmanship).map(craft => (
                                <option value={craft} key={craft}>
                                    {craft}
                                </option>
                            ))}
                        </Input>
                    </td>
                );
            case 'quantity':
                return (
                    <td key={key + block}>
                        <Input
                            type="select"
                            value={equipmentStatsValue[key].quantity}
                            equipmenttype={type}
                            equipmentkey={key}
                            name="quantity"
                            onChange={handleSelect}
                        >
                            {range(1, 10).map(number => (
                                <option value={+number} key={number}>
                                    {number}
                                </option>
                            ))}
                        </Input>
                    </td>
                );
            default:
                return <td key={key} />;
        }
    }, [equipmentStatsValue, skills, qualities, gearDiceValue, craftsmanship, handleStatus, handleDelete, handleSelect]);

    return (
        <div>
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>EQUIPMENT</div>
            </Row>
            <hr />
            <Row className="my-4">
                <div className="col">
                    <b className="my-auto">MONEY:&nbsp;</b>
                    <Input
                        type="number"
                        value={money > 0 ? money : ''}
                        onBlur={() => dispatch(changeData(money, 'money'))}
                        onChange={handleChangeMoney}
                        className="w-25"
                    />
                </div>
                {theme === 'KF' && (
                    <div className="col">
                        <b className="my-auto">ÆMBER:&nbsp;</b>
                        <Input
                            type="number"
                            value={aember > 0 ? aember : ''}
                            onBlur={() => dispatch(changeData(aember, 'aember'))}
                            onChange={handleChangeAember}
                            className="w-25"
                        />
                    </div>
                )}
            </Row>
            <Row className="m-1">
                <Col>
                    Encumbrance:{' '}
                    <b
                        className={`text-${
                            totalEncumbranceValue > encumbranceLimitValue
                                ? 'danger'
                                : 'dark'
                        }`}
                    >
                        {totalEncumbranceValue}/{encumbranceLimitValue}
                    </b>
                </Col>
                <Col>
                    Soak: <b>{totalSoakValue}</b>
                </Col>
                <Col>
                    Melee: <b>{totalDefenseValue.melee}</b> Ranged:{' '}
                    <b>{totalDefenseValue.ranged}</b>
                </Col>
            </Row>
            <Row>
                <Tabs
                    defaultIndex={0}
                    className="d-print-none  overflowX"
                    style={{ width: '90vw' }}
                >
                    <TabList>
                        <Tab>WEAPONS</Tab>
                        <Tab>ARMOR</Tab>
                        <Tab>GEAR</Tab>
                    </TabList>
                    <TabPanel>
                        {Object.keys(equipmentWeapons).length > 0 && (
                            <Table className="text-center bg-light">
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>CARRY</th>
                                        <th>DAM</th>
                                        <th>CRIT</th>
                                        <th>RANGE</th>
                                        <th>SKILL</th>
                                        <th>ENCUM</th>
                                        <th>QUAL</th>
                                        <th>CRAFT</th>
                                        <th>DICE</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(equipmentWeapons).map(
                                        key => (
                                            <tr key={key}>
                                                {[
                                                    'name',
                                                    'carried',
                                                    'damage',
                                                    'critical',
                                                    'range',
                                                    'skill',
                                                    'encumbrance',
                                                    'qualities',
                                                    'craftsmanship',
                                                    'gearDice',
                                                    'deleteButton'
                                                ].map(block =>
                                                    getLabel(
                                                        'equipmentWeapons',
                                                        block,
                                                        key
                                                    )
                                                )}
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </Table>
                        )}
                        {buttons('equipmentWeapons')}
                    </TabPanel>
                    <TabPanel>
                        {Object.keys(equipmentArmor).length > 0 && (
                            <Table className="text-center">
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>EQUIP</th>
                                        <th>CARRY</th>
                                        <th>SOAK</th>
                                        <th>DEFENSE</th>
                                        <th>RANGED</th>
                                        <th>MELEE</th>
                                        <th>ENCUM</th>
                                        <th>QUAL</th>
                                        <th>CRAFT</th>

                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(equipmentArmor).map(
                                        key => (
                                            <tr key={key}>
                                                {[
                                                    'name',
                                                    'equipped',
                                                    'carried',
                                                    'soak',
                                                    'defense',
                                                    'rangedDefense',
                                                    'meleeDefense',
                                                    'encumbrance',
                                                    'qualities',
                                                    'craftsmanship',
                                                    'deleteButton'
                                                ].map(block =>
                                                    getLabel(
                                                        'equipmentArmor',
                                                        block,
                                                        key
                                                    )
                                                )}
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </Table>
                        )}
                        {buttons('equipmentArmor')}
                    </TabPanel>
                    <TabPanel>
                        {Object.keys(equipmentGear).length > 0 && (
                            <Table className="text-center">
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>CARRY</th>
                                        <th>QUANTITY</th>
                                        <th>ENCUM</th>
                                        <th>QUAL</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(equipmentGear).map(key => (
                                        <tr key={key}>
                                            {[
                                                'name',
                                                'carried',
                                                'quantity',
                                                'encumbrance',
                                                'qualities',
                                                'deleteButton'
                                            ].map(block =>
                                                getLabel(
                                                    'equipmentGear',
                                                    block,
                                                    key
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                        {buttons('equipmentGear')}
                    </TabPanel>
                </Tabs>
            </Row>
            <Gear
                modal={!!equipModal}
                type={typeof equipModal === 'string' ? equipModal : ''}
                handleClose={() => setEquipModal(false)}
            />
        </div>
    );
};

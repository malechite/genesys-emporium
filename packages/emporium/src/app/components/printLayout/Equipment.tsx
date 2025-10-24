import { encumbranceLimit, equipmentStats, gearDice, totalEncumbrance } from '@emporium/selectors';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Table } from 'reactstrap';
import { Description } from '../Description';

interface EquipmentProps {}

export const Equipment = ({}: EquipmentProps) => {
    const armor = useSelector((state: any) => state.armor);
    const gear = useSelector((state: any) => state.gear);
    const equipmentArmor = useSelector((state: any) => state.equipmentArmor);
    const equipmentGear = useSelector((state: any) => state.equipmentGear);
    const equipmentStatsSelector = useSelector((state: any) => equipmentStats(state));
    const encumbranceLimitSelector = useSelector((state: any) => encumbranceLimit(state));
    const equipmentWeapons = useSelector((state: any) => state.equipmentWeapons);
    const gearDiceSelector = useSelector((state: any) => gearDice(state)) as any;
    const qualities = useSelector((state: any) => state.qualities);
    const skills = useSelector((state: any) => state.skills);
    const totalEncumbranceSelector = useSelector((state: any) => totalEncumbrance(state));
    const weapons = useSelector((state: any) => state.weapons);
    const money = useSelector((state: any) => state.money);
    const theme = useSelector((state: any) => state.theme);

    const getLabel = useCallback((block: string, key: string): React.ReactNode => {
        const item = equipmentStatsSelector[key];
        if (!item && block !== 'deleteButton') {
            return <td key={key + block}>MissingData</td>;
        }
        switch (block) {
            case 'carried':
            case 'equipped':
                return (
                    <td key={key + block}>
                        {equipmentStatsSelector[key][block] ? '✓' : ''}
                    </td>
                );
            case 'name':
            case 'damage':
            case 'critical':
            case 'range':
            case 'encumbrance':
            case 'soak':
            case 'defense':
            case 'rangedDefense':
            case 'meleeDefense':
            case 'quantity':
                return <td key={key + block}>{item[block]}</td>;
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
                        <Description text={gearDiceSelector.weapons[key]} />
                    </td>
                );
            case 'craftsmanship':
                return <td key={key + block}>{item[block]}</td>;
            default:
                return <td key={key} />;
        }
    }, [equipmentStatsSelector, skills, qualities, gearDiceSelector]);

    return (
        <div className="w-100">
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>GEAR</div>
            </Row>
            <hr />
            <Row className="my-2">
                <Col>
                    <b className="mx-1"> MONEY: </b>
                    {money > 0 ? money : ''}
                </Col>
                <Col>
                    <b className="mx-1">Encumbrance: </b>
                    <b
                        className={`text-${
                            totalEncumbranceSelector > encumbranceLimitSelector
                                ? 'danger'
                                : 'dark'
                        }`}
                    >
                        {totalEncumbranceSelector}/{encumbranceLimitSelector}
                    </b>
                </Col>
            </Row>
            {Object.keys(equipmentWeapons).length > 0 && (
                <Row>
                    <h5 style={{ textAlign: 'left' }}>Weapons:</h5>
                    <Table className="text-center">
                        <thead>
                            <tr>
                                <th>CARRIED</th>
                                <th>CRAFT</th>
                                <th>NAME</th>
                                <th>DAM</th>
                                <th>CRIT</th>
                                <th>RANGE</th>
                                <th>SKILL</th>
                                <th>ENCUM</th>
                                <th>QUAL</th>
                                <th>DICE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(equipmentWeapons).map(key => (
                                <tr key={key}>
                                    {[
                                        'carried',
                                        'craftsmanship',
                                        'name',
                                        'damage',
                                        'critical',
                                        'range',
                                        'skill',
                                        'encumbrance',
                                        'qualities',
                                        'gearDice'
                                    ].map(block =>
                                        getLabel(block, key)
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            )}
            {Object.keys(equipmentArmor).length > 0 && (
                <Row>
                    <h5 style={{ textAlign: 'left' }}>Armor:</h5>
                    <Table className="text-center">
                        <thead>
                            <tr>
                                <th>EQUIPPED</th>
                                <th>CARRIED</th>
                                <th>CRAFT</th>
                                <th>NAME</th>
                                <th>SOAK</th>
                                <th>DEF</th>
                                <th>RANGED DEF</th>
                                <th>MELEE DEF</th>
                                <th>ENCUM</th>
                                <th>QUAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(equipmentArmor).map(key => (
                                <tr key={key}>
                                    {[
                                        'equipped',
                                        'carried',
                                        'craftsmanship',
                                        'name',
                                        'soak',
                                        'defense',
                                        'rangedDefense',
                                        'meleeDefense',
                                        'encumbrance',
                                        'qualities'
                                    ].map(block =>
                                        getLabel(block, key)
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            )}
            {Object.keys(equipmentGear).length > 0 && (
                <Row>
                    <h5 style={{ textAlign: 'left' }}>Gear:</h5>
                    <Table className="text-center">
                        <thead>
                            <tr>
                                <th>CARRRIED</th>
                                <th>NAME</th>
                                <th>AMOUNT</th>
                                <th>ENCUM</th>
                                <th>QUAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(equipmentGear).map(key => (
                                <tr key={key}>
                                    {[
                                        'carried',
                                        'name',
                                        'quantity',
                                        'encumbrance',
                                        'qualities'
                                    ].map(block =>
                                        getLabel(block, key)
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            )}
        </div>
    );
};

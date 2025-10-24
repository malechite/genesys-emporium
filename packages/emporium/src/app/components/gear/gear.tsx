import { changeData } from '@emporium/actions';
import { books } from '@emporium/data-lists';
import clone from 'clone';
import React, { useState, useCallback, useMemo } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table
} from 'reactstrap';
import styled from 'styled-components';

interface GearProps {
    type: string;
    modal: boolean;
    handleClose: () => void;
}

export const Gear = ({ type, modal, handleClose }: GearProps) => {
    const [gearFilter, setGearFilter] = useState('');
    const [bookFilter, setBookFilter] = useState<string[]>([]);
    const [restrictToSetting, setRestrictToSetting] = useState(false);

    const armor = useSelector((state: any) => state.armor);
    const weapons = useSelector((state: any) => state.weapons);
    const gear = useSelector((state: any) => state.gear);
    const skills = useSelector((state: any) => state.skills);
    const equipmentArmor = useSelector((state: any) => state.equipmentArmor);
    const equipmentGear = useSelector((state: any) => state.equipmentGear);
    const equipmentWeapons = useSelector((state: any) => state.equipmentWeapons);
    const theme = useSelector((state: any) => state.theme);
    const setting = useSelector((state: any) => state.setting);
    const dispatch = useDispatch() as any;

    const currentEquipment = useSelector((state: any) => state[type]);

    const handleAdd = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
        const obj = { ...currentEquipment };
        const key = Math.random().toString(36).substr(2, 16);
        obj[key] = { id: (event.target as HTMLButtonElement).name, carried: true, equipped: false };
        dispatch(changeData(obj, `${type}`));
        handleCloseModal();
        event.preventDefault();
    }, [currentEquipment, type, dispatch]);

    const handleCloseModal = useCallback(() => {
        setGearFilter('');
        setBookFilter([]);
        handleClose();
    }, [handleClose]);

    const generateEquipmentTableHeader = useCallback(() => {
        switch (type) {
            case 'equipmentWeapons':
                return (
                    <tr className="text-center">
                        <th>Add</th>
                        <th className="text-left">Name</th>
                        <th className="text-left">Skill</th>
                        <th>DAM</th>
                        <th>CRIT</th>
                        <th>BOOK</th>
                    </tr>
                );
            case 'equipmentArmor':
                return (
                    <tr className="text-center">
                        <th>Add</th>
                        <th className="text-left">Name</th>
                        <th>Soak</th>
                        <th>Defense</th>
                        <th>BOOK</th>
                    </tr>
                );
            case 'equipmentGear':
                return (
                    <tr className="text-center">
                        <th>Add</th>
                        <th className="text-left">Name</th>
                        <th>Price</th>
                        <th>BOOK</th>
                    </tr>
                );
            default:
                break;
        }
    }, [type]);

    const handleSettingRestrictionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.checked;
        setRestrictToSetting(!!value);
    }, []);

    const filterItem = useCallback((
        item: string,
        filter: string,
        bookFilterList: string[],
        restrictToSettingFlag: boolean
    ): boolean => {
        if (!filter && !bookFilterList) {
            return true;
        }

        let selectedItem: any = null;
        switch (type) {
            case 'equipmentWeapons':
                selectedItem = weapons[item];
                break;
            case 'equipmentArmor':
                selectedItem = armor[item];
                break;
            case 'equipmentGear':
                selectedItem = gear[item];
                break;
            default:
                return false;
        }

        if (filter) {
            const name = (selectedItem?.name || '')
                .toLowerCase()
                .replace(/ /g, '');

            const passes = name.indexOf(filter) !== -1;
            if (!passes) {
                return false;
            }
        }

        if (bookFilterList.length && bookFilterList.indexOf('All') === -1) {
            const passes =
                bookFilterList
                    .map(x => x?.toLowerCase())
                    .indexOf(selectedItem?.book?.toLowerCase()) !== -1;

            if (!passes) {
                return false;
            }
        }

        if (
            restrictToSettingFlag &&
            setting.length > 0 &&
            setting.indexOf('All') === -1
        ) {
            let passes = false;
            for (let i = 0; i < setting.length; i++) {
                if ((selectedItem?.setting?.indexOf(setting[i]) ?? -1) !== -1) {
                    passes = true;
                    break;
                }
            }

            if (!passes) {
                return false;
            }
        }

        return true;
    }, [type, weapons, armor, gear, setting]);

    const generateEquipmentTableBody = useCallback((item: string) => {
        switch (type) {
            case 'equipmentWeapons':
                return (
                    <tr key={item}>
                        <td>
                            <Button
                                color="secondary"
                                name={item}
                                onClick={handleAdd}
                            >
                                +
                            </Button>
                        </td>
                        <td>{weapons[item].name}</td>
                        <td>
                            {skills[weapons[item].skill] &&
                                skills[weapons[item].skill].name}
                        </td>
                        <td className="text-center">{weapons[item].damage}</td>
                        <td className="text-center">
                            {weapons[item].critical}
                        </td>
                        <td>{weapons[item].book || 'Custom'}</td>
                    </tr>
                );

            case 'equipmentArmor':
                return (
                    <tr key={item}>
                        <td>
                            <Button
                                color="secondary"
                                name={item}
                                onClick={handleAdd}
                            >
                                +
                            </Button>
                        </td>
                        <td>{armor[item].name}</td>
                        <td className="text-center">{armor[item].soak}</td>
                        <td className="text-center">{armor[item].defense}</td>
                        <td>{armor[item].book || 'Custom'}</td>
                    </tr>
                );
            case 'equipmentGear':
                return (
                    <tr key={item}>
                        <td>
                            <Button
                                color="secondary"
                                name={item}
                                onClick={handleAdd}
                            >
                                +
                            </Button>
                        </td>
                        <td>{gear[item].name}</td>
                        <td className="text-center">{gear[item].price}</td>
                        <td>{gear[item].book || 'Custom'}</td>
                    </tr>
                );
            default:
                break;
        }
    }, [type, weapons, armor, gear, skills, handleAdd]);

    const handleFilterChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        const filterValue = (event?.target?.value || '')
            .trim()
            .toLowerCase()
            .replace(/ /g, '');

        setGearFilter(filterValue);
    }, []);

    const data = useMemo(() => {
        switch (type) {
            case 'equipmentWeapons':
                return clone(weapons);
            case 'equipmentArmor':
                return clone(armor);
            case 'equipmentGear':
                return clone(gear);
            default:
                return null;
        }
    }, [type, weapons, armor, gear]);

    return (
        <StyledGearModal
            className={`body-${theme}`}
            isOpen={!!modal}
            toggle={handleCloseModal}
        >
            <ModalHeader toggle={handleCloseModal}>
                Select your {type.toString().slice(9)}
            </ModalHeader>
            <ModalBody className="m-1">
                <div>
                    <ItemFilter
                        type="text"
                        placeholder="Name Filter"
                        onChange={handleFilterChange}
                    />
                    <StyledTypeahead
                        id={`settingChooser`}
                        multiple={true}
                        options={books}
                        placeholder="Book Filter"
                        clearButton={true}
                        onChange={selected =>
                            setBookFilter(
                                selected.includes('All')
                                    ? ['All']
                                    : selected
                            )
                        }
                    />
                </div>
                <TableContainer>
                    <Table>
                        <thead>{generateEquipmentTableHeader()}</thead>
                        <tbody>
                            {data &&
                                Object.keys(data)
                                    .sort()
                                    .filter(item =>
                                        filterItem(
                                            item,
                                            gearFilter,
                                            bookFilter,
                                            restrictToSetting
                                        )
                                    )
                                    .map(item =>
                                        generateEquipmentTableBody(
                                            item
                                        )
                                    )}
                        </tbody>
                    </Table>
                </TableContainer>
            </ModalBody>
            <ModalFooter>
                <SettingsRestriction
                    title="By enabling this, you restrict options to only those found in your selected settings"
                >
                    <label htmlFor="settingsRestriction">
                        Restrict to Settings
                    </label>
                    <input
                        id="settingsRestriction"
                        type="checkbox"
                        checked={restrictToSetting}
                        onChange={handleSettingRestrictionChange}
                    />
                </SettingsRestriction>
                <Button onClick={handleCloseModal}>Close</Button>
            </ModalFooter>
        </StyledGearModal>
    );
};

// Styled Components
const StyledGearModal = styled(Modal)`
    max-width: 600px;

    table td {
        &:first-child {
            text-align: center;

            button {
                width: 27px;
                height: 27px;
                text-align: center;
                padding: 0;
            }
        }

        &:last-child {
            text-align: center;
        }
    }
`;

const ItemFilter = styled.input`
    width: 30%;
    display: inline-block;
    border-radius: 4px;
    padding: 7px 0 5px 11px;
    border: 1px solid rgb(206, 212, 218);
    margin: -15px 5px 5px;
    vertical-align: top;
`;

const TableContainer = styled(Row)`
    clear: right;
`;

const StyledTypeahead = styled(Typeahead)`
    position: relative;
    width: calc(70% - 10px);
    display: inline-block;
    margin-top: -15px;
    margin-bottom: 5px;

    .rbt-aux .rbt-close {
        margin-top: 3px;
    }
`;

const SettingsRestriction = styled.span`
    margin-top: 4px;
    position: absolute;
    left: 16px;

    input {
        width: 20px;
        height: 20px;
        vertical-align: middle;
    }

    label {
        margin-right: 5px;
        font-size: 1.2em;
    }
`;

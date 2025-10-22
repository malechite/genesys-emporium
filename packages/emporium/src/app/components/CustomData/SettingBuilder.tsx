import clone from 'clone';
import { startCase, upperFirst } from 'lodash-es';
import React, { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardText,
    Col,
    Input,
    Row
} from 'reactstrap';

interface SettingBuilderProps {
    changeCustomData?: (object: any, type: string, flag: boolean) => void;
}

export const SettingBuilder = ({ changeCustomData }: SettingBuilderProps) => {
    const archetypes = useSelector((state: any) => state.archetypes);
    const careers = useSelector((state: any) => state.careers);
    const skills = useSelector((state: any) => state.skills);
    const talents = useSelector((state: any) => state.talents);
    const archetypeTalents = useSelector((state: any) => state.archetypeTalents);
    const armor = useSelector((state: any) => state.armor);
    const gear = useSelector((state: any) => state.gear);
    const weapons = useSelector((state: any) => state.weapons);
    const settings = useSelector((state: any) => state.settings);
    const customArchetypes = useSelector((state: any) => state.customArchetypes);
    const customArchetypeTalents = useSelector((state: any) => state.customArchetypeTalents);
    const customArmor = useSelector((state: any) => state.customArmor);
    const customCareers = useSelector((state: any) => state.customCareers);
    const customGear = useSelector((state: any) => state.customGear);
    const customSkills = useSelector((state: any) => state.customSkills);
    const customTalents = useSelector((state: any) => state.customTalents);
    const customWeapons = useSelector((state: any) => state.customWeapons);

    const [selectedArchetypes, setSelectedArchetypes] = useState<string[]>([]);
    const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedTalents, setSelectedTalents] = useState<string[]>([]);
    const [selectedArchetypeTalents, setSelectedArchetypeTalents] = useState<string[]>([]);
    const [selectedArmor, setSelectedArmor] = useState<string[]>([]);
    const [selectedGear, setSelectedGear] = useState<string[]>([]);
    const [selectedWeapons, setSelectedWeapons] = useState<string[]>([]);
    const [setting, setSetting] = useState('');

    const _types = useMemo(() => [
        'archetypes',
        'careers',
        'skills',
        'talents',
        'archetypeTalents',
        'armor',
        'gear',
        'weapons'
    ], []);

    const propsMap = useMemo(() => ({
        archetypes,
        careers,
        skills,
        talents,
        archetypeTalents,
        armor,
        gear,
        weapons
    }), [archetypes, careers, skills, talents, archetypeTalents, armor, gear, weapons]);

    const customPropsMap = useMemo(() => ({
        archetypes: customArchetypes,
        careers: customCareers,
        skills: customSkills,
        talents: customTalents,
        archetypeTalents: customArchetypeTalents,
        armor: customArmor,
        gear: customGear,
        weapons: customWeapons
    }), [customArchetypes, customCareers, customSkills, customTalents, customArchetypeTalents, customArmor, customGear, customWeapons]);

    const stateMap = useMemo(() => ({
        archetypes: selectedArchetypes,
        careers: selectedCareers,
        skills: selectedSkills,
        talents: selectedTalents,
        archetypeTalents: selectedArchetypeTalents,
        armor: selectedArmor,
        gear: selectedGear,
        weapons: selectedWeapons
    }), [selectedArchetypes, selectedCareers, selectedSkills, selectedTalents, selectedArchetypeTalents, selectedArmor, selectedGear, selectedWeapons]);

    const setterMap = useMemo(() => ({
        archetypes: setSelectedArchetypes,
        careers: setSelectedCareers,
        skills: setSelectedSkills,
        talents: setSelectedTalents,
        archetypeTalents: setSelectedArchetypeTalents,
        armor: setSelectedArmor,
        gear: setSelectedGear,
        weapons: setSelectedWeapons
    }), []);

    const initState = useCallback(() => {
        setSelectedArchetypes([]);
        setSelectedCareers([]);
        setSelectedSkills([]);
        setSelectedTalents([]);
        setSelectedArchetypeTalents([]);
        setSelectedArmor([]);
        setSelectedGear([]);
        setSelectedWeapons([]);
        setSetting('');
    }, []);

    const handleChange = useCallback(() => {
        // This wasn't defined when I came to this file, but it was being used
        // in the renderer, so I defined it as a noop in case it comes up later...
    }, []);

    const applySetting = useCallback(() => {
        _types.forEach(type => {
            const object = clone(customPropsMap[type as keyof typeof customPropsMap]);
            stateMap[type as keyof typeof stateMap].forEach((item: string) => {
                if (!object[item]) {
                    object[item] = { name: startCase(item) };
                }
                if (!object[item].setting) {
                    object[item].setting = [];
                }
                object[item].setting.push(settings[setting]);
            });
            changeCustomData?.(object, `custom${upperFirst(type)}`, true);
        });
        initState();
        alert(
            `${settings[setting]} setting has been applied to all selected items`
        );
    }, [_types, customPropsMap, stateMap, settings, setting, changeCustomData, initState]);

    return (
        <div className="align-self-end align-self-middle">
            <Row className="align-items-center">
                <Col md="auto">
                    <Input
                        type="select"
                        value={setting}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setSetting(event.target.value)
                        }
                    >
                        {settings &&
                            Object.keys(settings).map(key => (
                                <option value={key} key={key}>
                                    {settings[key]}
                                </option>
                            ))}
                    </Input>
                </Col>
                <Col>
                    <Button
                        className="m-2 align-middle"
                        onClick={applySetting}
                    >
                        Add Setting
                    </Button>
                </Col>
            </Row>
            <Row>
                {_types.sort().map(type => (
                    <Col key={type}>
                        <Card className="m-2 w-100">
                            <CardHeader>
                                <CardText className="ml-2">
                                    <Input
                                        type="checkbox"
                                        checked={
                                            stateMap[type as keyof typeof stateMap].length ===
                                            Object.keys(propsMap[type as keyof typeof propsMap])
                                                .length
                                        }
                                        value={type}
                                        onChange={handleChange}
                                    />
                                    <strong>{startCase(type)}</strong>
                                </CardText>
                            </CardHeader>
                            <CardBody className="py-2 ml-4">
                                {Object.keys(propsMap[type as keyof typeof propsMap])
                                    .sort()
                                    .map(item => (
                                        <CardText key={item}>
                                            <Input
                                                type="checkbox"
                                                checked={stateMap[type as keyof typeof stateMap].includes(item)}
                                                value={type}
                                                name={item}
                                                onChange={handleChange}
                                            />
                                            {propsMap[type as keyof typeof propsMap][item].name
                                                ? propsMap[type as keyof typeof propsMap][item]
                                                      .name
                                                : item}
                                        </CardText>
                                    ))}
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

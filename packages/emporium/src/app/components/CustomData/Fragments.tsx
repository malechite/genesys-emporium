import { startCase } from 'lodash-es';
import React, { useCallback } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useSelector } from 'react-redux';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { Description } from '../Description';

interface FragmentProps {
    type: string;
    name?: string;
    title?: string;
    value?: any;
    mode?: string;
    handleChange?: (event: any) => void;
    setState?: (selected: any) => void;
    setting?: any[];
    array?: any[];
    nameObj?: any;
    object?: any;
    handleClear?: () => void;
    blankText?: string;
    blankOption?: boolean;
}

// TODO: Refactor, rename to avoid conflicting with React.Fragment
export const Fragment = ({
    type,
    name,
    title,
    value = '',
    mode,
    handleChange,
    setState,
    setting,
    array,
    nameObj,
    object,
    handleClear,
    blankText = '',
    blankOption = true
}: FragmentProps) => {
    const settings = useSelector((state: any) => state.settings);

    const buildList = useCallback((arr: any[], obj: any, nObj: any) => {
        if (!obj) {
            return arr
                .map(key => (nObj[key] ? nObj[key].name : key))
                .sort()
                .join(', ');
        }

        let text = '';
        arr.sort().forEach(key => {
            text += nObj[key] ? nObj[key].name : key;
            if (obj[key] > 1) {
                text += `(${obj[key]}), `;
            } else {
                text += ', ';
            }
        });
        return text.slice(0, -2);
    }, []);

    const buildField = useCallback(() => {
        switch (type) {
            case 'name':
                return (
                    <Input
                        type="text"
                        bsSize="sm"
                        value={value}
                        maxLength="50"
                        onChange={handleChange}
                        disabled={mode === 'edit'}
                    />
                );
            case 'text':
                return (
                    <Input
                        type="text"
                        bsSize="sm"
                        value={value}
                        maxLength="50"
                        onChange={handleChange}
                    />
                );
            case 'number':
                return (
                    <Input
                        type="number"
                        bsSize="sm"
                        value={value}
                        maxLength="7"
                        onChange={handleChange}
                    />
                );
            case 'list':
                return (
                    <div style={{ display: 'inline-flex' }}>
                        <Description
                            text={buildList(array || [], object, nameObj)}
                        />
                        {array && array.length > 0 && (
                            <Button
                                className="btn-outline-warning ml-2"
                                onClick={handleClear}
                            >
                                Clear
                            </Button>
                        )}
                    </div>
                );
            case 'setting':
                return (
                    <Typeahead
                        id={`settingChooser`}
                        multiple={true}
                        options={Object.values(settings)}
                        selected={setting}
                        placeholder="Choose a Setting..."
                        clearButton={true}
                        onChange={selected =>
                            setState?.(
                                selected.includes('All') ? ['All'] : selected
                            )
                        }
                    />
                );
            case 'description':
            case 'weapons':
                return (
                    <Input
                        onChange={handleChange}
                        type="textarea"
                        name="description"
                        rows="8"
                        maxLength="1000"
                        className="w-100"
                        value={value}
                    />
                );
            case 'inputSelect':
                return (
                    <Input
                        type="select"
                        bsSize="sm"
                        value={value}
                        name={name}
                        onChange={handleChange}
                    >
                        {blankOption && <option value="">{blankText}</option>}
                        {array &&
                            array
                                .sort((a, b) => a - b)
                                .map(key => (
                                    <option value={key} key={key}>
                                        {nameObj
                                            ? nameObj[key.toString()]
                                                ? nameObj[key.toString()].name
                                                : startCase(key)
                                            : startCase(key)}
                                    </option>
                                ))}
                    </Input>
                );
            case 'numberSelect':
                return (
                    <Input
                        type="select"
                        bsSize="sm"
                        value={value}
                        name={name}
                        onChange={handleChange}
                    >
                        {array &&
                            array.map(key => (
                                <option value={key} key={key}>
                                    {key}
                                </option>
                            ))}
                    </Input>
                );
            default:
                return null;
        }
    }, [type, value, mode, handleChange, array, nameObj, object, handleClear, blankText, blankOption, name, settings, setting, setState, buildList]);

    const displayTitle = title || name || type;

    return (
        <Row className="my-2 ">
            <Label
                for={displayTitle}
                sm="2"
                className={
                    displayTitle === 'description' || displayTitle === 'weapons'
                        ? 'mt-0'
                        : 'my-auto'
                }
            >
                <b>{startCase(displayTitle)}</b>
            </Label>
            <Col id={displayTitle}>{buildField()}</Col>
        </Row>
    );
};

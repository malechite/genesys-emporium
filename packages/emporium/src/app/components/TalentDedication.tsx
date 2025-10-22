import { changeData } from '@emporium/actions';
import { characteristics } from '@emporium/selectors';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Input, Row } from 'reactstrap';

interface TalentDedicationProps {
    row: number;
    selection: string;
    handleDedicationChange: (value: string) => void;
}

export const TalentDedication = ({ row, selection, handleDedicationChange }: TalentDedicationProps) => {
    const characteristicsValue = useSelector((state: any) => characteristics(state));
    const talentModifiers = useSelector((state: any) => state.talentModifiers);

    const options = useMemo(() => {
        const opts: string[] = [];
        Object.keys(characteristicsValue).forEach(characteristic => {
            if (
                5 > characteristicsValue[characteristic] &&
                !Object.values(talentModifiers.Dedication).includes(
                    characteristic
                )
            ) {
                opts.push(characteristic);
            }
        });
        talentModifiers.Dedication[row] &&
            opts.push(talentModifiers.Dedication[row]);
        opts.sort();
        return opts;
    }, [characteristicsValue, talentModifiers, row]);

    useEffect(() => {
        return () => {
            handleDedicationChange('');
        };
    }, [handleDedicationChange]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        handleDedicationChange(event.target.value);
        event.preventDefault();
    }, [handleDedicationChange]);

    return (
        <Row>
            <b>Select a characteristic to increase:</b>
            <Input
                type="select"
                value={selection}
                onChange={handleChange}
            >
                <option value="" />
                {options.map(key => (
                    <option value={key} key={key}>
                        {key}
                    </option>
                ))}
            </Input>
        </Row>
    );
};

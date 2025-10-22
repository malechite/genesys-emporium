import { criticalText } from '@emporium/selectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Table } from 'reactstrap';
import { Description } from '../Description';

interface CriticalProps {}

export const Critical = ({}: CriticalProps) => {
    const critical = useSelector((state: any) => state.critical);
    const theme = useSelector((state: any) => state.theme);

    return (
        <div className="w-100">
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>
                    CRITICAL INJURES
                </div>
            </Row>
            <hr />
            <Table className="bg-light">
                <thead>
                    <tr>
                        <th>CRITICAL</th>
                        <th>DESCRIPTION</th>
                    </tr>
                </thead>
                <tbody>
                    {critical.map((critRoll, index) => (
                        <tr className="my-2" key={index}>
                            <td>
                                <b>{critRoll}:</b>
                            </td>
                            <td>
                                <Description
                                    text={criticalText(critRoll)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

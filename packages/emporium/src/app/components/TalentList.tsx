import { talentCount } from '@emporium/selectors';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Row, Table } from 'reactstrap';
import { Description } from './Description';

interface TalentListProps {}

export const TalentList = ({}: TalentListProps) => {
    const talents = useSelector((state: any) => state.talents);
    const archetype = useSelector((state: any) => state.archetype);
    const archetypes = useSelector((state: any) => state.archetypes);
    const archetypeTalents = useSelector((state: any) => state.archetypeTalents);
    const misc = useSelector((state: any) => state.misc);
    const talentCountValue = useSelector((state: any) => talentCount(state));
    const theme = useSelector((state: any) => state.theme);

    const activation = useCallback((value: boolean) => {
        if (value) {
            return 'var(--orangeFade)';
        } else {
            return 'var(--lightblueFade)';
        }
    }, []);

    return (
        <div className="no-break">
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>TALENT LIST</div>
            </Row>
            <hr />
            <Table className="fontSizeSmall bg-light">
                <thead>
                    <tr className="text-center">
                        {[
                            'Talent',
                            'Ranks',
                            'Activation',
                            'Type',
                            'Description'
                        ].map(heading => (
                            <th key={heading} className="px-2">
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {archetypes[archetype] &&
                        archetypes[archetype].talents &&
                        archetypes[archetype].talents.sort().map(
                            key =>
                                archetypeTalents[key] && (
                                    <tr key={key}>
                                        <td>
                                            {archetypeTalents[key].name}
                                        </td>
                                        <td />
                                        <td
                                            className="text-center"
                                            style={{
                                                backgroundColor: activation(
                                                    archetypeTalents[key]
                                                        .activation
                                                )
                                            }}
                                        >
                                            {archetypeTalents[key]
                                                .activation
                                                ? 'Active'
                                                : 'Passive'}
                                        </td>
                                        <td className="text-center">
                                            {archetypeTalents[key].turn}
                                        </td>
                                        <td>
                                            <Description
                                                text={
                                                    archetypeTalents[key]
                                                        .description
                                                        ? archetypeTalents[
                                                              key
                                                          ].description
                                                        : ''
                                                }
                                            />
                                        </td>
                                    </tr>
                                )
                        )}
                    {misc &&
                        misc.archetypeTalents &&
                        archetypeTalents[misc.archetypeTalents] && (
                            <tr>
                                <td>
                                    {
                                        archetypeTalents[
                                            misc.archetypeTalents
                                        ].name
                                    }
                                </td>
                                <td />
                                <td
                                    className="text-center"
                                    style={{
                                        backgroundColor: activation(
                                            archetypeTalents[
                                                misc.archetypeTalents
                                            ].activation
                                        )
                                    }}
                                >
                                    {archetypeTalents[misc.archetypeTalents]
                                        .activation
                                        ? 'Active'
                                        : 'Passive'}
                                </td>
                                <td className="text-center">
                                    {
                                        archetypeTalents[
                                            misc.archetypeTalents
                                        ].turn
                                    }
                                </td>
                                <td>
                                    <Description
                                        text={
                                            archetypeTalents[
                                                misc.archetypeTalents
                                            ].description
                                        }
                                    />
                                </td>
                            </tr>
                        )}
                    {Object.keys(talentCountValue)
                        .sort()
                        .map(
                            key =>
                                talents[key] && (
                                    <tr key={key}>
                                        <td>{talents[key].name}</td>
                                        <td className="text-center">
                                            {talentCountValue[key]}
                                        </td>
                                        <td
                                            className="text-center"
                                            style={{
                                                backgroundColor: activation(
                                                    talents[key].activation
                                                )
                                            }}
                                        >
                                            {talents[key].activation
                                                ? 'Active'
                                                : 'Passive'}
                                        </td>
                                        <td className="text-center">
                                            {talents[key].turn}
                                        </td>
                                        <td>
                                            <Description
                                                text={
                                                    talents[key].description
                                                        ? talents[key]
                                                              .description
                                                        : ''
                                                }
                                            />
                                        </td>
                                    </tr>
                                )
                        )}
                </tbody>
            </Table>
        </div>
    );
};

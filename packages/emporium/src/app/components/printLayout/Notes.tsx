import React from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import { Description } from '../Description';

interface NotesProps {}

export const Notes = ({}: NotesProps) => {
    const description = useSelector((state: any) => state.description);
    const theme = useSelector((state: any) => state.theme);

    return (
        <div className="no-break">
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>NOTES</div>
            </Row>
            <hr />
            <Row style={{ whiteSpace: 'pre-line' }}>
                <Description
                    text={description.notes ? description.notes : ''}
                />
            </Row>
        </div>
    );
};

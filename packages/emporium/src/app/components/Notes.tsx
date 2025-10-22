import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Row } from 'reactstrap';
import { changeData } from '@emporium/actions';

export const Notes = () => {
    const dispatch = useDispatch();
    const description = useSelector((state: any) => state.description);
    const theme = useSelector((state: any) => state.theme);
    const [notes, setNotes] = useState(description.notes);

    return (
        <div>
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>NOTES</div>
            </Row>
            <hr />
            <Row className="justify-content-center mx-auto">
                <Input
                    onBlur={() =>
                        dispatch(changeData({ ...description, notes }, 'description'))
                    }
                    onChange={event => setNotes(event.target.value)}
                    type="textarea"
                    className="w-100"
                    rows="31"
                    maxLength="5000"
                    value={notes}
                />
            </Row>
        </div>
    );
};

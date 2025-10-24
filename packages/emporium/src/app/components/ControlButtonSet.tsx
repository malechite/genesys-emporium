import React from 'react';
import { Button, ButtonGroup, Row } from 'reactstrap';

export const ControlButtonSet = ({
    mode,
    type,
    handleSubmit,
    onEditSubmit,
    onEditCancel,
    disabled
}: {
  mode: string;
  type: string;
  handleSubmit?: any;
  onEditSubmit?: any;
  onEditCancel?: any;
  disabled?: boolean;
}) => {
    switch (mode) {
        case 'add':
            return (
                <Row className="justify-content-end my-1">
                    <ButtonGroup>
                        <Button onClick={onEditCancel}>Clear</Button>
                        <Button onClick={handleSubmit} disabled={disabled || false}>
                            Add {type}
                        </Button>
                    </ButtonGroup>
                </Row>
            );
        case 'edit':
            return (
                <Row className="justify-content-end my-1">
                    <ButtonGroup>
                        <Button
                            onClick={onEditCancel}
                            className="btn btn-warning"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onEditSubmit}
                            className="btn btn-success"
                        >
                            Submit Changes
                        </Button>
                    </ButtonGroup>
                </Row>
            );
        default:
            throw new Error('Did not send valid mode to ControlButtonSet.js');
    }
};

export default ControlButtonSet;

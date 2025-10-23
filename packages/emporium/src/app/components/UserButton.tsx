import { changeUser } from '@emporium/actions';
// Firebase auth removed - TODO: implement FeathersJS authentication
// import firebase from '@firebase/app';
// import '@firebase/auth';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';

interface UserButtonProps {}

export const UserButton = ({}: UserButtonProps) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);

    const getName = useCallback(() => {
        // TODO: Get actual user name from FeathersJS API
        return 'Dev User (ID: ' + user + ')';
    }, [user]);

    const handleClick = useCallback(async () => {
        // TODO: Implement FeathersJS sign out
        dispatch(changeUser(null));
    }, [dispatch]);

    return (
        <UncontrolledButtonDropdown>
            <DropdownToggle caret size="sm">
                {getName()}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={handleClick}>
                    Sign Out (disabled)
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledButtonDropdown>
    );
};

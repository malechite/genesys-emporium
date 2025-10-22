import { changeUser } from '@emporium/actions';
import firebase from '@firebase/app';
import '@firebase/auth';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';

interface UserButtonProps {}

export const UserButton = ({}: UserButtonProps) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);

    const getName = useCallback(() => {
        const user = firebase.auth().currentUser;
        let name = 'Rando Calrissian';
        if (user) {
            if (user.email) {
                name = user.email;
            } else if (user.phoneNumber) {
                name = user.phoneNumber;
            }
        }
        return name;
    }, []);

    const handleClick = useCallback(async () => {
        firebase
            .auth()
            .signOut()
            .then(() => dispatch(changeUser(null)))
            .catch(console.error);
    }, [dispatch]);

    return (
        <UncontrolledButtonDropdown>
            <DropdownToggle caret size="sm">
                {getName()}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={handleClick}>
                    Sign Out
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledButtonDropdown>
    );
};

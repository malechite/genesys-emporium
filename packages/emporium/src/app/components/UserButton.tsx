import { changeUser } from '@emporium/actions';
import { userService } from '../../api/client';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';

interface UserButtonProps {}

export const UserButton = ({}: UserButtonProps) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const [username, setUsername] = useState<string>('User');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await userService().get(user);
                setUsername(userData.username || userData.email || `User ${user}`);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUsername(`User ${user}`);
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    const handleLogout = useCallback(async () => {
        // Remove JWT token from localStorage
        localStorage.removeItem('feathers-jwt');

        // Reset user state
        dispatch(changeUser(null));

        // Reload the page to reset all state
        window.location.reload();
    }, [dispatch]);

    return (
        <UncontrolledButtonDropdown>
            <DropdownToggle caret size="sm">
                {username}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={handleLogout}>
                    Sign Out
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledButtonDropdown>
    );
};

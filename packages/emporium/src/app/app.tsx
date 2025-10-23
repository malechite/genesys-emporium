import { changeUser, loadCharacterList, loadData, loadDataSets, loadDoc, writeUser } from '@emporium/actions';
// Firebase auth removed - TODO: implement FeathersJS authentication
// import firebase from '@firebase/app';
// import '@firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import ReactGA from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Container } from 'reactstrap';
import './app.scss';
import { DataPage, DiscordLogin, Loading, MainPage, User, VehicleSelect } from './components';
import { CustomData } from './components/CustomData';

declare const window: any;

export const App = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const user = useSelector((state: any) => state.user);
    const character = useSelector((state: any) => state.character);
    const loadingData = useSelector((state: any) => state.loadingData);
    const printContent = useSelector((state: any) => state.printContent);
    const theme = useSelector((state: any) => state.theme);
    const vehicle = useSelector((state: any) => state.vehicle);

    const prevUserRef = useRef(user);
    const prevCharacterRef = useRef(character);
    const prevVehicleRef = useRef(vehicle);
    const prevPrintContentRef = useRef(printContent);

    // Initialize app and register service worker
    useEffect(() => {
        // Only enable Google Analytics in production
        if (process.env.NODE_ENV === 'production' && process.env.NX_gaID) {
            ReactGA.initialize(process.env.NX_gaID);
            ReactGA.pageview(window.location.pathname);
        }

        setLoading(false);

        // Register service worker
        if ('serviceWorker' in (window?.navigator || {})) {
            window.addEventListener('load', () => {
                navigator.serviceWorker
                    .register('/assets/service-worker.js')
                    .then(registration => {
                        console.log(
                            'ServiceWorker registration successful with scope: ',
                            registration.scope
                        );
                    }, console.error);
            });
        } else {
            console.warn('Service worker is not supported');
        }
    }, [dispatch]);

    // Handle user changes
    useEffect(() => {
        if (user && prevUserRef.current !== user) {
            writeUser();
            dispatch(loadCharacterList());
            dispatch(loadDataSets());
        }
        prevUserRef.current = user;
    }, [user, dispatch]);

    // Handle character changes
    useEffect(() => {
        if (character && character !== prevCharacterRef.current) {
            dispatch(loadData());
        }
        prevCharacterRef.current = character;
    }, [character, dispatch]);

    // Handle vehicle changes
    useEffect(() => {
        if (vehicle && vehicle !== prevVehicleRef.current) {
            dispatch(loadDoc('vehicle', vehicle));
        }
        prevVehicleRef.current = vehicle;
    }, [vehicle, dispatch]);

    // Handle print
    useEffect(() => {
        if (printContent !== prevPrintContentRef.current) {
            setTimeout(() => window.print(), 400);
        }
        prevPrintContentRef.current = printContent;
    }, [printContent]);

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return <DiscordLogin onLogin={(userId) => {
            dispatch(changeUser(userId));
            dispatch(loadCharacterList());
            dispatch(loadDataSets());
        }} />;
    }

    if (loadingData) {
        return <Loading />;
    }

    return (
        <Container className={`body-${theme}`}>
            <Tabs
                defaultIndex={0}
                className="d-print-none mt-2 mx-1"
                style={{ marginBottom: '5rem' }}
            >
                <TabList>
                    <Tab>CHARACTERS</Tab>
                    <Tab>VEHICLES</Tab>
                    <Tab>CUSTOM DATA</Tab>
                    <Tab>EXPORT / IMPORT</Tab>
                </TabList>
                <TabPanel>
                    <MainPage />
                </TabPanel>
                <TabPanel>
                    <VehicleSelect />
                </TabPanel>
                <TabPanel>
                    <CustomData />
                </TabPanel>
                <TabPanel>
                    <DataPage />
                </TabPanel>
            </Tabs>
            <div className="d-none d-print-block">
                {printContent}
            </div>
            <div className={`bg bg-${theme} d-print-none`} />
        </Container>
    );
};

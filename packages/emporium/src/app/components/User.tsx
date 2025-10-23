// Firebase authentication UI removed - TODO: implement FeathersJS authentication
// import { firebase } from '@firebase/app';
// import '@firebase/auth';
// import * as firebaseui from "firebaseui";
import React from 'react';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Container, Row, Button } from 'reactstrap';
import * as images from '@emporium/images';
import { About } from './About';

interface UserProps {}

export const User = ({}: UserProps) => {
    // TODO: Implement FeathersJS authentication
    // For now, show a placeholder message

    return (
        <div>
            <Container className="container-fluid my-4">
                <div className={`bg bg-CRB d-print-none`} />
                <Row className="justify-content-center">
                    <h1>Genesys Emporium</h1>
                </Row>
                <Row className="justify-content-center">
                    <h2>Genesys Character Creator</h2>
                </Row>
                <Row className="justify-content-center my-4">
                    <img
                        src={images.CRB.Logo}
                        alt=""
                        style={{ maxHeight: '150px' }}
                    />
                </Row>
                <Row className="justify-content-center my-2">
                    <div className="alert alert-info">
                        <h4>Authentication Temporarily Disabled</h4>
                        <p>Firebase authentication has been removed. FeathersJS authentication will be implemented soon.</p>
                        <p>For now, you're automatically logged in as a development user.</p>
                    </div>
                </Row>
                <Row className="justify-content-center">
                    <About />
                </Row>
            </Container>
        </div>
    );
};

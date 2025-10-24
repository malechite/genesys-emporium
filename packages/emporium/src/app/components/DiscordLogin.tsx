import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Container, Row, Col } from 'reactstrap';
import { changeUser } from '@emporium/actions';

interface DiscordLoginProps {
  onLogin: (userId: number) => void;
}

export const DiscordLogin: React.FC<DiscordLoginProps> = ({ onLogin }) => {
  const dispatch = useDispatch() as any;

  useEffect(() => {
    // Check if we have a token in the URL (from OAuth callback)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Store token in localStorage
      localStorage.setItem('feathers-jwt', token);

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);

      // Decode token to get user info
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.userId || payload.sub; // JWT standard uses 'sub' for user ID
        if (userId) {
          dispatch(changeUser(userId));
          onLogin(userId);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      // Check if we already have a token in localStorage
      const storedToken = localStorage.getItem('feathers-jwt');
      console.log('DiscordLogin: Checking for stored token...', storedToken ? 'Found' : 'Not found');

      if (storedToken) {
        try {
          const payload = JSON.parse(atob(storedToken.split('.')[1]));
          console.log('DiscordLogin: Token payload:', payload);

          // Check if token is still valid (not expired)
          if (payload.exp && payload.exp * 1000 > Date.now()) {
            const userId = payload.userId || payload.sub; // JWT standard uses 'sub' for user ID
            console.log('DiscordLogin: Token is valid, userId:', userId);
            if (userId) {
              dispatch(changeUser(userId));
              onLogin(userId);
            }
          } else {
            // Token expired, remove it
            console.log('DiscordLogin: Token expired, removing');
            localStorage.removeItem('feathers-jwt');
          }
        } catch (error) {
          console.error('DiscordLogin: Error reading stored token:', error);
          localStorage.removeItem('feathers-jwt');
        }
      }
    }
  }, [dispatch, onLogin]);

  const handleDiscordLogin = () => {
    // Redirect to NextJS home page which handles Discord OAuth
    // In Next.js context, redirect to root which has the login button
    // In standalone mode, redirect directly to API
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost' && window.location.port === '3000') {
      // Running in Next.js dev mode, redirect to root
      window.location.href = '/';
    } else {
      // Standalone mode or production - redirect to API
      const apiUrl = process.env.REACT_APP_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';
      window.location.href = `${apiUrl}/oauth/discord`;
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md="6" className="text-center">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-4">Welcome to Genesys Emporium</h2>
              <p className="text-muted mb-4">
                Sign in with Discord to access your characters and campaigns
              </p>
              <Button
                color="primary"
                size="lg"
                onClick={handleDiscordLogin}
                style={{
                  backgroundColor: '#5865F2',
                  borderColor: '#5865F2',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                <i className="fab fa-discord" style={{ marginRight: '8px' }}></i>
                Login with Discord
              </Button>
              <p className="text-muted mt-4 small">
                By logging in, you agree to our terms of service
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

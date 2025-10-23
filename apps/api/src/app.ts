import { feathers } from '@feathersjs/feathers';
import { koa, rest, errorHandler, cors } from '@feathersjs/koa';
import socketio from '@feathersjs/socketio';
import bodyParser from '@koa/bodyparser';
import knex from 'knex';

import type { Application } from './declarations';
import { services } from './services/index';
import { authentication } from './authentication';
import knexConfig from './knexfile';

const app: Application = koa(feathers());

// Setup database
const db = knex(knexConfig.development);
app.set('knexClient', db);

// Load app configuration
app.use(cors());
app.use(bodyParser());

// Configure services and real-time functionality
app.configure(rest());
app.configure(
    socketio({
        cors: {
            origin: '*'
        }
    })
);

// Debug: Log Discord OAuth configuration
console.log('Discord OAuth Configuration:');
console.log('- Client ID:', process.env.DISCORD_CLIENT_ID);
console.log('- Client Secret:', process.env.DISCORD_CLIENT_SECRET ? '[SET]' : '[NOT SET]');
console.log('- Callback URL:', process.env.DISCORD_CALLBACK_URL);

// Configure authentication settings BEFORE calling authentication
app.set('authentication', {
    entity: 'user',
    service: 'users',
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
    authStrategies: ['jwt', 'discord'],
    jwtOptions: {
        header: { typ: 'access' },
        audience: 'https://yourdomain.com',
        issuer: 'feathers',
        algorithm: 'HS256',
        expiresIn: '7d'
    },
    oauth: {
        // This is the OAuth callback URL that Discord redirects to (must match Discord dev portal)
        // Our custom getRedirect() method handles the final redirect to the frontend
        redirect: 'http://localhost:3030/oauth/discord/callback',
        defaults: {
            origin: 'http://localhost:3030' // API origin
        },
        discord: {
            key: process.env.DISCORD_CLIENT_ID,
            secret: process.env.DISCORD_CLIENT_SECRET,
            scope: ['identify', 'email']
        }
    }
});

// Register services (must come before authentication)
app.configure(services);

// Configure authentication (must come after services)
app.configure(authentication);

app.use(errorHandler());

// Register hooks that run for all services
app.hooks({
    around: {
        all: []
    },
    before: {},
    after: {},
    error: {}
});

// Register application setup and teardown hooks
app.hooks({
    setup: [],
    teardown: []
});

export { app };

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

// Configure authentication
app.configure(authentication);

// Configure OAuth settings
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
    redirect: '/',
    discord: {
      key: process.env.DISCORD_CLIENT_ID,
      secret: process.env.DISCORD_CLIENT_SECRET,
      scope: ['identify', 'email'],
      callbackURL: process.env.DISCORD_CALLBACK_URL || 'http://localhost:3030/oauth/discord/callback'
    }
  }
});

app.use(errorHandler());

// Configure services and real-time functionality
app.configure(rest());
app.configure(socketio({
  cors: {
    origin: '*'
  }
}));

// Register services
app.configure(services);

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

import { feathers } from '@feathersjs/feathers';
import { koa, rest, errorHandler, cors } from '@feathersjs/koa';
import socketio from '@feathersjs/socketio';
import bodyParser from '@koa/bodyparser';

import type { Application } from './declarations';
import { services } from './services/index';

const app: Application = koa(feathers());

// Load app configuration
app.use(cors());
app.use(bodyParser());
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

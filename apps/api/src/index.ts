import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';

const port = process.env.API_PORT || 3030;
const host = process.env.API_HOST || 'localhost';

process.on('unhandledRejection', (reason) =>
  console.error('Unhandled Rejection:', reason)
);

app.listen(port).then(() => {
  console.log(`Feathers API started on http://${host}:${port}`);
});

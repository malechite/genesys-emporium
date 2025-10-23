import dotenv from 'dotenv';
import path from 'path';

// Load .env from project root (two directories up from src)
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

import { app } from './app';

const port = process.env.API_PORT || 3030;
const host = process.env.API_HOST || 'localhost';

process.on('unhandledRejection', (reason) =>
  console.error('Unhandled Rejection:', reason)
);

app.listen(port).then(() => {
  console.log(`Feathers API started on http://${host}:${port}`);
});

import express, { Request, Response, Express } from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
import dotenvSafe from 'dotenv-safe';

import authRouter from './routes/auth.routes';

dotenvSafe.config({
  example: process.env.NODE_ENV == 'dev' ? '.env.dev.example' : '.env.example',
  path: process.env.NODE_ENV == 'dev' ? '.env.dev' : '.env',
});

dotenv.config({ path: process.env.NODE_ENV == 'dev' ? '.env.dev' : '.env' });

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const db_url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

const app: Express = express();
const port = process.env.SERVER_PORT;

app.use(express.json());

app.use('/auth', authRouter);

app.get('/', (req: Request, res: Response): Response => {
  return res.json({
    message: `Server is running tttststs at https://localhost:${port}`,
  });
});

mongoose
  .connect(db_url)
  .then(() => console.log(`[mongo] connected to ${db_url}`));

app.listen(port, () => {
  console.log(`[server]: running at https://localhost:${port}`);
});

// https://medium.com/codechef-vit/a-better-project-structure-with-express-and-node-js-c23abc2d736f
// https://medium.com/@agutierrezt/a-node-implementation-for-refresh-token-with-redis-a062020bbec0

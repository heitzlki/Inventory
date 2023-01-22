import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import { CatalogState } from './types';

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

const logger = (req: Request, res: Response, next: NextFunction) => {
  const today = new Date(Date.now());
  console.log(`├── [${today.toISOString()}] ROUTE[${req.originalUrl}]`);
  next();
};
app.use(logger);

app.get('/catalog', (req: Request, res: Response) => {
  try {
    const catalogFile = fs.readFileSync('./catalog.json', 'utf8');
    const catalog: CatalogState = JSON.parse(catalogFile);
    res.json(catalog);
  } catch {
    res.status(500).send('Error reading catalog file');
  }
});

app.listen(port, () => {
  console.log(`╭─ Running on port: ${port}`);
});

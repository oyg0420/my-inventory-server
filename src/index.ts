import express, { Express } from 'express';
import connectDB from './loaders/db';
import * as dotenv from 'dotenv';
import router from './api/route';
import globalErrorHandler from './errors/globalErrorHandler';
import verifyAuthToken from './api/middleware/authentication';
import cors from 'cors';

const app: Express = express();
dotenv.config();
connectDB();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
// app.use(verifyAuthToken);
app.use(router);
app.use(globalErrorHandler);

app
  .listen(3001, () => {
    console.log(`
    ################################################
    🍎  Server listening on port: 3001 🍎
    ################################################
  `);
  })
  .on('error', err => {
    console.error(err);
    process.exit(1);
  });

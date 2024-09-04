import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import path from 'path';
import expressListRoutes from 'express-list-routes';
import cors from 'cors';
import log4js from 'log4js';
import { connectAllDb } from './connectionManager.js';
import { router } from './api/routes.js';

// Express app instance
const app = express();

console.log('NODE_ENV:', process.env.NODE_ENV);

// helmet for security purpose
app.use(helmet());

// Logging Http Request
const appLogger = log4js.getLogger();
app.use(log4js.connectLogger(appLogger));

// CORS - To hanlde cross origin requests
app.use(
  cors({
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'https://compman.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Parsing the body of the http
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectAllDb();

// global.appRoot = path.resolve(__dirname);

// mount the api routes
router(app);

// List all routes
// expressListRoutes(app);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Express server started at port: ${PORT}`);
});

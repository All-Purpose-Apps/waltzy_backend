import express from 'express';
import v1Routes from './v1/routes.js';

export const router = (app) => {
  // Home API Route
  app.get('/', (req, res, next) => {
    res.json({ body: 'Basic multi-tenant application' });
  });

  const apiRoutes = express.Router();

  // Mounting V1 routes on api
  apiRoutes.use('/v1', v1Routes);

  // If no routes matches
  apiRoutes.use((req, res, next) => {
    if (!req.route) {
      const error = new Error('No route matched');
      error.status = 404;
      return next(error);
    }

    next();
  });

  app.use('/api', apiRoutes);
};

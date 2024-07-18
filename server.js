import express from 'express';
import expressListRoutes from 'express-list-routes';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './src/config/db.js';
import userRoutes from './src/routes/userRoutes.js';
import personRoutes from './src/routes/personRoutes.js';
import studioRoutes from './src/routes/studioRoutes.js';
import danceRoutes from './src/routes/danceRoutes.js';
import danceCategoryRoutes from './src/routes/danceCategoryRoutes.js';
import heatRoutes from './src/routes/heatRoutes.js';
import coupleRoutes from './src/routes/coupleRoutes.js';

const app = express();
db();

app.use(cors({ exposedHeaders: ['X-Total-Count'] }));
app.use(bodyParser.json());

app.use('/api_v1/danceCategory', danceCategoryRoutes);
app.use('/api_v1/dances', danceRoutes);
app.use('/api_v1/dancers', personRoutes);
app.use('/api_v1/studios', studioRoutes);
app.use('/api_v1/users', userRoutes);
app.use('/api_v1/heats', heatRoutes);
app.use('/api_v1/couples', coupleRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});

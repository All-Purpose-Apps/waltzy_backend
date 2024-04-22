import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './src/config/db.js';
import userRoutes from './src/routes/userRoutes.js';
import personRoutes from './src/routes/personRoutes.js';
import danceRoutes from './src/routes/danceRoutes.js';
import danceCategoryRoutes from './src/routes/danceCategoryRoutes.js';
import heatRoutes from './src/routes/heatRoutes.js';

const app = express();
db();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World with Express');
});

app.use('/api_v1/person', personRoutes);
app.use('/api_v1/users', userRoutes);
app.use('/api_v1/dance', danceRoutes);
app.use('/api_v1/categories', danceCategoryRoutes);
app.use('/api_v1/heats', heatRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});

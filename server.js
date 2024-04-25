import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './src/config/db.js';
import raExpressMongoose from 'express-mongoose-ra-json-server';
// import userRoutes from './src/routes/userRoutes.js';
// import personRoutes from './src/routes/personRoutes.js';
import danceRoutes from './src/routes/danceRoutes.js';
import danceCategoryRoutes from './src/routes/danceCategoryRoutes.js';
// import heatRoutes from './src/routes/heatRoutes.js';
// import coupleRoutes from './src/routes/coupleRoutes.js';
import Dance from './src/models/Dance.js';
import DanceCategory from './src/models/DanceCategory.js';
import Couple from './src/models/Couple.js';
import Heat from './src/models/Heat.js';
import Person from './src/models/Person.js';
import User from './src/models/User.js';

const app = express();
db();

app.use(cors({ exposedHeaders: ['X-Total-Count'] }));
app.use(bodyParser.json());

app.use('/api_v1/danceCategory', danceCategoryRoutes);
app.use('/api_v1/dances', danceRoutes);
// app.use('/api_v1/dances', raExpressMongoose(Dance));
// app.use('/api_v1/categories', raExpressMongoose(DanceCategory));
// app.use('/api_v1/couples', raExpressMongoose(Couple));
// app.use('/api_v1/heats', raExpressMongoose(Heat));
// app.use('/api_v1/person', raExpressMongoose(Person));
// app.use('/api_v1/user', raExpressMongoose(User));

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});

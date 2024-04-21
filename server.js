import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World with Express');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});

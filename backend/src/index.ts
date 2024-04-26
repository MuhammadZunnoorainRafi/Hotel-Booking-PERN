import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import usersRoute from './routes/userRoutes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/user', usersRoute);

app.listen(7000, () => {
  console.log('Server is running on PORT 7000');
});

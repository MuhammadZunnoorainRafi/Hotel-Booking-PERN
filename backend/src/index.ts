import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import usersRoute from './routes/userRoutes';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/api/user', usersRoute);

app.listen(7000, () => {
  console.log('Server is running on PORT 7000');
});

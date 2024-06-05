import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import usersRoute from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT_BACKEND || 4000;
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

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use('/api/user', usersRoute);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.listen(7000, () => {
  console.log(`Server is running on PORT ${7000}`);
});

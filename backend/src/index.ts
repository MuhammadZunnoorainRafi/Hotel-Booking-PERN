import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import usersRoute from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import path from 'path';

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

// app.use(express.static(path.join(__dirname, '../../frontend/dist')));

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, '/frontend/dist/index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use('/api/user', usersRoute);

app.listen(7000, () => {
  console.log(`Server is running on PORT ${7000}`);
});

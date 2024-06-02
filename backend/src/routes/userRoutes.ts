import express from 'express';
import {
  loginController,
  registerController,
  verifyTokenController,
} from '../controllers/userControllers';
import { verifyToken } from '../middleware/authMiddleware';

const usersRoute = express.Router();

usersRoute.post('/register', registerController);
usersRoute.post('/login', loginController);
usersRoute.get('/validate-token', verifyToken, verifyTokenController);
usersRoute.get('/logout', verifyToken, verifyTokenController);

export default usersRoute;

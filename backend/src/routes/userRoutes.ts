import express from 'express';
import {
  loginController,
  logoutController,
  registerController,
  verifyTokenController,
} from '../controllers/userControllers';
import { verifyToken } from '../middleware/authMiddleware';

const usersRoute = express.Router();

usersRoute.post('/register', registerController);
usersRoute.post('/login', loginController);
usersRoute.get('/validate-token', verifyToken, verifyTokenController);
usersRoute.post('/logout', logoutController);

export default usersRoute;

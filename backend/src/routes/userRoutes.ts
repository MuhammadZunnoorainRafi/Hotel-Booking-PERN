import express from 'express';
import {
  loginController,
  registerController,
} from '../controllers/userControllers';

const usersRoute = express.Router();
usersRoute.post('/register', registerController);
usersRoute.post('/login', loginController);

export default usersRoute;

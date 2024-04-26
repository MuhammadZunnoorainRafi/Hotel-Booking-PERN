import express from 'express';
import { registerController } from '../controllers/userControllers';

const usersRoute = express.Router();
usersRoute.post('/register', registerController);

export default usersRoute;

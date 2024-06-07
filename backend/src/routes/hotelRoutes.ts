import express, { Request, Response } from 'express';
import multer from 'multer';
import { hotelFormSchema } from '../lib/schemas';
import { verifyToken } from '../middleware/authMiddleware';
import {
  addHotelController,
  getAllHotelsController,
} from '../controllers/hotelControllers';

// const storage = multer.memoryStorage();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const hotelRoutes = express.Router();

hotelRoutes.post(
  '/add',
  verifyToken,
  upload.array('imageFiles', 6),
  addHotelController
);
hotelRoutes.get('/getAll', verifyToken, getAllHotelsController);
hotelRoutes.get('/get/:id', verifyToken, getAllHotelsController);

export default hotelRoutes;

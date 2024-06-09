import express, { Request, Response } from 'express';
import multer from 'multer';
import { hotelFormSchema } from '../lib/schemas';
import { verifyToken } from '../middleware/authMiddleware';
import {
  addHotelController,
  editHotelController,
  getAllHotelsController,
  getSingleHotelController,
} from '../controllers/hotelControllers';
import { searchHotelController } from '../controllers/searchController';

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
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
hotelRoutes.get('/get/:id', verifyToken, getSingleHotelController);
hotelRoutes.put(
  '/edit',
  verifyToken,
  upload.array('imageFiles'),
  editHotelController
);

// Searching & Filtering Routes

hotelRoutes.get('/search', searchHotelController);

export default hotelRoutes;

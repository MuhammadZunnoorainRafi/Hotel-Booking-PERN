import express from 'express';
import multer from 'multer';
import {
  addHotelController,
  bookingPaymentController,
  editHotelController,
  getAllHotelsController,
  getSingleHotelController,
  paymentIntentController,
} from '../controllers/hotelControllers';
import { searchHotelController } from '../controllers/searchController';
import { verifyToken } from '../middleware/authMiddleware';

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
hotelRoutes.get('/getAll', getAllHotelsController);
hotelRoutes.get('/get/:id', getSingleHotelController);
hotelRoutes.put(
  '/edit',
  verifyToken,
  upload.array('imageFiles'),
  editHotelController
);

// Searching & Filtering Route
hotelRoutes.get('/search', searchHotelController);

// Stripe Payment Route
hotelRoutes.post(
  '/booking/:hotelId/payment-intent',
  verifyToken,
  paymentIntentController
);

hotelRoutes.post('/:hotelId/booking', verifyToken, bookingPaymentController);

export default hotelRoutes;

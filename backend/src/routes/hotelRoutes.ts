import express, { Request, Response } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const hotelRoutes = express.Router();

hotelRoutes.post(
  '/',
  upload.array('imageFiles', 6),
  (req: Request, res: Response) => {
    const imageFiles = req.files as Express.Multer.File[];
  }
);

export default hotelRoutes;

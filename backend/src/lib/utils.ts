import { Response } from 'express';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';

export const cookieToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 86400000,
  };

  res.cookie('auth_token', token, options);
};

export const uploadImages = async (imageFiles: Express.Multer.File[]) => {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString('base64'); // it just converts the image file into an array
    const dataURI = 'data:' + image.mimetype + ';base64,' + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
};

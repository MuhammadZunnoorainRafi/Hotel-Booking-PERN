import { Response } from 'express';
import jwt from 'jsonwebtoken';

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

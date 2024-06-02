import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { pool } from '../lib/db';

declare global {
  namespace Express {
    interface Request {
      user: { id: string; name: string; email: string };
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies['auth_token'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const db = await pool.connect();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = (decoded as JwtPayload).userId;
    const { rows } = await db.query(
      'SELECT id,name,email,created_at FROM users WHERE id=?',
      [userId]
    );
    req.user = rows[0];
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  } finally {
    db.release();
  }
};

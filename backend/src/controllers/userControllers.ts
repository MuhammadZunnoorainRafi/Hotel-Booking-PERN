import { Request, Response } from 'express';
import { pool } from '../lib/db';
import { userLogSchema, userRegSchema } from '../lib/schemas';
import bcryptjs from 'bcryptjs';
import { cookieToken } from '../lib/utils';
import { RequestUser } from '../middleware/authMiddleware';

// @desc Register User POST
// @route /api/user/register
// @access Public
export const registerController = async (req: Request, res: Response) => {
  const db = await pool.connect();
  try {
    const validation = userRegSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json(validation.error.flatten().fieldErrors);
    }
    const { name, email, password } = validation.data;
    const userExists = await db.query('SELECT * FROM users WHERE email= $1', [
      email,
    ]);
    if (userExists.rows[0]) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await db.query(
      'INSERT INTO users(name, email, password) VALUES ($1,$2,$3) RETURNING email',
      [name, email, hashedPassword]
    );
    if (newUser.rows[0]) {
      cookieToken(newUser.rows[0].id, res);
      res.status(200).json({ message: 'User Created' });
    } else {
      return res.status(401).json({ message: 'User not created' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  } finally {
    db.release();
  }
};

// @desc Login User POST
// @route /api/user/login
// @access PUBLIC
export const loginController = async (req: Request, res: Response) => {
  const db = await pool.connect();
  try {
    const validation = userLogSchema.safeParse(req.body);
    if (!validation.success) {
      return res
        .status(400)
        .json({ errors: validation.error.flatten().fieldErrors });
    }

    const { email, password } = validation.data;
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    // 👇 Below query is for testing JOINS b\w USERS,HOTELS & BOOKINGS table for getting "booking" details
    // const test = await db.query(`SELECT u.name,h.country,b.total_cost
    //                                     FROM users u JOIN hotels h ON
    //                                     u.id=h.user_id JOIN bookings b ON
    //                                     b.hotel_id=h.id
    //                                     `);

    if (
      userExists.rows[0] &&
      (await bcryptjs.compare(password, userExists.rows[0].password))
    ) {
      cookieToken(userExists.rows[0].id, res);
      res.status(200).json({ userId: userExists.rows[0].id });
    } else {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  } finally {
    db.release();
  }
};

export const verifyTokenController = async (
  req: RequestUser,
  res: Response
) => {
  res.status(200).json({ user: req.user });
};

export const logoutController = async (req: Request, res: Response) => {
  res.clearCookie('auth_token');
  res.send();
};

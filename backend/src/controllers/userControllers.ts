import { Request, Response } from 'express';
import { pool } from '../utils/db';
import { userLogSchema, userRegSchema } from '../utils/schemas';
import bcryptjs from 'bcryptjs';

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
      'INSERT INTO users(name, email, password) VALUES ($1,$2,$3) RETURNING *',
      [name, email, hashedPassword]
    );
    db.release();
    if (newUser) {
      return res.status(200).json(newUser.rows[0]);
    } else {
      return res.status(401).json({ message: 'User not created' });
    }
  } catch (error) {
    db.release();
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
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
    // TODO: continue from here
    if (
      userExists.rows[0] &&
      (await bcryptjs.compare(password, userExists.rows[0].hashedPassword))
    ) {
    }
  } catch (error) {
    db.release();
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

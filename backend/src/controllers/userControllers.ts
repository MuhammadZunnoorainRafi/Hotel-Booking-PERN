import { Request, Response } from 'express';
import { pool } from '../utils/db';

// @desc Register User POST
// @route /api/user/register
// @access Public
export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const db = await pool.connect();
    const userExists = await db.query(
      `SELECT * FROM users WHERE email=${email}`
    );
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
    }

    const newUser = await db.query(
      `INSERT INTO users(name,email,password) VALUES ?`,
      [name, email, password]
    );
    if (newUser) {
      res.status(200).json(newUser);
    } else {
      res.status(401).json({ message: 'User not created' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(error);
  }
};

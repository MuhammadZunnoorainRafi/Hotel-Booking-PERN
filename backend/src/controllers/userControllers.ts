import { Request, Response } from 'express';
import { pool } from '../utils/db';
import { userSchema } from '../utils/schemas';

// @desc Register User POST
// @route /api/user/register
// @access Public
export const registerController = async (req: Request, res: Response) => {
  try {
    const validation = userSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json(validation.error.flatten().fieldErrors);
    }
    const { name, email, password } = validation.data;
    const db = await pool.connect();
    const userExists = await db.query(
      `SELECT * FROM users WHERE email=${email}`
    );
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
    }

    const query = {
      name: 'insert-user',
      text: 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *',
      values: [name, email, password],
    };
    // const newUser = await db.query(
    //   `INSERT INTO users(name, email, password) VALUES($1, $2, $3)`,
    //   [name, email, password]
    // );
    const newUser = await db.query(query);
    if (newUser) {
      res.status(200).json(newUser.rows[0]);
    } else {
      res.status(401).json({ message: 'User not created' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(error);
  }
};

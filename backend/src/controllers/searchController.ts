import { Request, Response } from 'express';
import { pool } from '../lib/db';
import { HotelSearchResponse } from '../lib/types';

export const searchHotelController = async (req: Request, res: Response) => {
  const { query } = req;
  const pageSize = 3;
  const pageNumber = query.page ? parseInt(query.page.toString()) : 1;
  const skip = (pageNumber - 1) * pageSize;

  const db = await pool.connect();
  try {
    const { rowCount } = await db.query(
      'SELECT * FROM hotels WHERE city ILIKE $1 OR country ILIKE $1',
      [`%${query.destination}%`]
    );
    const { rows } = await db.query(
      'SELECT * FROM hotels WHERE  city ILIKE $3 OR country ILIKE $3 LIMIT $1 OFFSET $2',
      [pageSize, skip, `%${query.destination}%`]
    );

    // console.log(query);
    const total = rowCount || 0;
    const response: HotelSearchResponse = {
      data: rows,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong' });
  } finally {
    db.release();
  }
};

import { Request, Response } from 'express';
import { pool } from '../lib/db';
import { HotelSearchResponse } from '../lib/types';

export const searchHotelController = async (req: Request, res: Response) => {
  const pageSize = 5;
  const pageNumber = req.query.page ? parseInt(req.query.page.toString()) : 1;
  const skip = (pageNumber - 1) * pageSize;

  const db = await pool.connect();
  try {
    const { rows, rowCount } = await db.query(
      'SELECT * FROM hotels LIMIT=$1 OFFSET=$2',
      [pageSize, skip]
    );
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
    return res.status(400).json({ message: 'Something went wrong' });
  }
};

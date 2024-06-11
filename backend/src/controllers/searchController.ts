import { Request, Response } from 'express';
import { pool } from '../lib/db';
import { HotelSearchResponse } from '../lib/types';
import { hotelTypes } from '../lib/constants';

export const searchHotelController = async (req: Request, res: Response) => {
  const { query } = req;
  const pageSize = 3;
  const pageNumber = query.page ? parseInt(query.page.toString()) : 1;
  const skip = (pageNumber - 1) * pageSize;

  const db = await pool.connect();

  let stars = query.stars;
  let types = query.types;

  if (!Array.isArray(stars)) {
    stars = [stars as string];
  }

  if (!Array.isArray(types)) {
    types = [types as string];
  }

  try {
    const values = {
      limit: pageSize,
      offset: skip,
      destination: `%${query.destination ? query.destination : ''}%`, // did this for some learning purposes
      childCount: query.childCount,
      adultCount: query.adultCount,
      stars: query.stars ? stars : [1, 2, 3, 4, 5],
      types: query.types ? types : hotelTypes,
    };

    const { rowCount } = await db.query(
      `SELECT * FROM hotels WHERE 
       (city ILIKE $1 OR 
       country ILIKE $1) AND
       child_count >= $2 AND
       adult_count >= $3 AND
       star_rating = ANY ($4) AND
       type = ANY ($5)`,
      Object.values(values).slice(2)
    );

    const { rows } = await db.query(
      `SELECT * FROM hotels WHERE 
       (city ILIKE $3 OR 
       country ILIKE $3) AND
       child_count >= $4 AND
       adult_count >= $5 AND
       star_rating = ANY ($6) AND
       type = ANY ($7)
       LIMIT $1 OFFSET $2`,
      Object.values(values)
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
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong' });
  } finally {
    db.release();
  }
};

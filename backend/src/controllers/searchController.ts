import { Request, Response } from 'express';
import { pool } from '../lib/db';
import { HotelSearchResponse } from '../lib/types';
import { constructSearchQueries } from '../lib/utils';

export const searchHotelController = async (req: Request, res: Response) => {
  const { query } = req;
  const pageSize = 3;
  const pageNumber = query.page ? parseInt(query.page.toString()) : 1;
  const skip = (pageNumber - 1) * pageSize;

  const db = await pool.connect();

  let sortQuery = '';

  switch (query.sortOption) {
    case 'starRating':
      sortQuery = 'star_rating DESC';
      break;
    case 'pricePerNightAsc':
      sortQuery = 'price_per_night ASC';
      break;
    case 'pricePerNightDesc':
      sortQuery = 'price_per_night DESC';
      break;
  }

  const { constructedQuery, constructedValue, constructedTotalQuery } =
    await constructSearchQueries(query, pageSize, skip, sortQuery);

  try {
    const { rowCount } = await db.query(
      constructedTotalQuery,
      constructedValue
    );
    const { rows } = await db.query(constructedQuery, constructedValue);

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

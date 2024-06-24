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
  let facilities = query.facilities;
  let sortQuery = '';

  if (!Array.isArray(stars)) {
    stars = [stars as string];
  }

  if (!Array.isArray(types)) {
    types = [types as string];
  }

  if (!Array.isArray(facilities)) {
    facilities = [facilities as string];
  }

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

  try {
    const values = {
      limit: pageSize,
      offset: skip,
      // destination: `%${query.destination ? query.destination : ''}%`, // did this for some learning purposes
      destination: `%${query.destination || ''}%`,
      childCount: query.childCount,
      adultCount: query.adultCount,
      stars: query.stars ? stars : [1, 2, 3, 4, 5],
      types: query.types ? types : hotelTypes,
      facilities: query.facilities ? facilities : [],
      price_per_night: query.maxPrice,
    };

    // The "&&" operator is used to check if two arrays have any elements in common (array overlap). It returns TRUE if there is at least one common element between the two arrays.

    // The "ANY" operator is used to compare a single scalar value against a set of values (array or subquery result). It returns TRUE if the scalar value matches any element in the set.

    //  The "@>" operator checks if the array on the left contains all elements of the array on the right.

    const { rowCount } = await db.query(
      `SELECT * FROM hotels WHERE 
       (city ILIKE $1 OR 
       country ILIKE $1) AND
       child_count >= $2 AND
       adult_count >= $3 AND
       star_rating = ANY ($4) AND
       type = ANY ($5) AND
       facilities @> $6 AND
       price_per_night <= $7`,
      Object.values(values).slice(2)
    );

    const { rows } = await db.query(
      `SELECT * FROM hotels WHERE 
       (city ILIKE $3 OR 
       country ILIKE $3) AND
       child_count >= $4 AND
       adult_count >= $5 AND
       star_rating = ANY ($6) AND
       type = ANY ($7) AND
       facilities @> $8 AND
       price_per_night <= $9
       ${sortQuery && `ORDER BY ${sortQuery}`}
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

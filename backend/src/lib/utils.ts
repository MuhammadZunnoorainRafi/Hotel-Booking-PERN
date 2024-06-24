import { Response } from 'express';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';

export const cookieToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 86400000,
  };

  res.cookie('auth_token', token, options);
};

export const uploadImages = async (imageFiles: Express.Multer.File[]) => {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString('base64'); // it just converts the image file into an array
    const dataURI = 'data:' + image.mimetype + ';base64,' + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
};

export const constructSearchQueries = async (
  queryParams: any,
  pageSize?: number,
  skip?: number,
  sortQuery?: string
) => {
  let query = `SELECT * FROM hotels WHERE 1=1`;
  let values = [];
  let paramIndex = 1;

  if (queryParams.destination) {
    query += ` AND (city ILIKE $${paramIndex} OR country ILIKE $${paramIndex})`;
    values.push(`%${queryParams.destination}%`);
    paramIndex++;
  }

  if (queryParams.childCount !== undefined && queryParams.childCount > 0) {
    query += ` AND child_count >= $${paramIndex}`;
    values.push(queryParams.childCount);
    paramIndex++;
  }

  if (queryParams.adultCount !== undefined && queryParams.adultCount > 1) {
    query += ` AND adult_count >= $${paramIndex}`;
    values.push(queryParams.adultCount);
    paramIndex++;
  }

  if (queryParams.stars && queryParams.stars.length > 0) {
    query += ` AND star_rating = ANY ($${paramIndex})`;
    values.push([queryParams.stars]);
    paramIndex++;
  }

  if (queryParams.types && queryParams.types.length > 0) {
    query += ` AND type = ANY ($${paramIndex})`;
    values.push([queryParams.types]);
    paramIndex++;
  }

  if (queryParams.facilities && queryParams.facilities.length > 0) {
    query += ` AND facilities @> $${paramIndex}`;
    values.push([queryParams.facilities]);
    paramIndex++;
  }

  if (queryParams.price_per_night !== undefined) {
    query += ` AND price_per_night <= $${paramIndex}`;
    values.push(queryParams.price_per_night);
    paramIndex++;
  }

  if (sortQuery) {
    query += ` ORDER BY ${sortQuery}`;
  }
  const constructedTotalQuery = query;
  query += ` LIMIT ${pageSize} OFFSET ${skip}`;

  return {
    constructedQuery: query,
    constructedValue: values,
    constructedTotalQuery,
  };
};

// The "&&" operator is used to check if two arrays have any elements in common (array overlap). It returns TRUE if there is at least one common element between the two arrays.

// The "ANY" operator is used to compare a single scalar value against a set of values (array or subquery result). It returns TRUE if the scalar value matches any element in the set.

//  The "@>" operator checks if the array on the left contains all elements of the array on the right.

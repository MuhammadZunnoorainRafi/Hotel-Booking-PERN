import { Response } from 'express';
import { hotelFormSchema } from '../lib/schemas';
import { RequestUser } from '../middleware/authMiddleware';
import { uploadImages } from '../lib/utils';
import { pool } from '../lib/db';

export const addHotelController = async (req: RequestUser, res: Response) => {
  const db = await pool.connect();
  try {
    const validations = hotelFormSchema.safeParse(req.body);
    if (!validations.success) {
      return res.status(400).json(validations.error.flatten().fieldErrors);
    }

    let {
      name,
      city,
      country,
      description,
      type,
      starRating,
      facilities,
      adultCount,
      childCount,
      pricePerNight,
    } = validations.data;

    const imageFiles = req.files as Express.Multer.File[];
    const imageUrls = await uploadImages(imageFiles);

    const data = {
      user_id: req.user?.id,
      name: name,
      city: city,
      country: country,
      description: description,
      type: type,
      adult_count: adultCount,
      child_count: childCount,
      facilities: facilities,
      price_per_night: pricePerNight,
      star_rating: starRating,
      image_urls: imageUrls,
    };

    const { rows } = await db.query(
      'INSERT INTO hotels(user_id,name,city,country,description,type,adult_count,child_count,facilities,price_per_night,star_rating,image_urls) VALUES($1,2$,3$,4$,5$,6$,7$,8$,9$,10$,11$,12$)',
      Object.values(data)
    );
    if (rows[0]) {
      res.status(200).json({ message: 'Hotel added' });
    } else {
      return res.status(400).json({ message: 'Hotel is not added' });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong' });
  } finally {
    db.release();
  }
};

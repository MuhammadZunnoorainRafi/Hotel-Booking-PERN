import { Response } from 'express';
import { hotelFormSchema } from '../lib/schemas';
import { RequestUser } from '../middleware/authMiddleware';
import { uploadImages } from '../lib/utils';
import { pool } from '../lib/db';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

// @desc Add Hotel
// @route /api/hotel/add
// @access PRIVATE
export const addHotelController = async (req: RequestUser, res: Response) => {
  const db = await pool.connect();
  try {
    const validations = hotelFormSchema.safeParse(req.body);
    if (!validations.success) {
      console.log(validations.error.flatten().fieldErrors);
      return res.status(400).json(validations.error.flatten().fieldErrors);
    }

    let {
      name,
      city,
      country,
      description,
      type,
      star_rating,
      facilities,
      adult_count,
      child_count,
      price_per_night,
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
      adult_count: adult_count,
      child_count: child_count,
      facilities: facilities,
      price_per_night: price_per_night,
      star_rating: star_rating,
      image_urls: imageUrls,
    };

    const { rows } = await db.query(
      'INSERT INTO hotels(user_id,name,city,country,description,type,adult_count,child_count,facilities,price_per_night,star_rating,image_urls) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING name',
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

// @desc Get All Hotels
// @route /api/hotel/getAll
// @access PUBLIC

export const getAllHotelsController = async (
  req: RequestUser,
  res: Response
) => {
  const db = await pool.connect();
  try {
    // const { rows } = await db.query('SELECT * FROM hotels WHERE user_id=$1', [
    //   req.user?.id,
    // ]);
    const { rows } = await db.query('SELECT * FROM hotels');
    res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json({ message: 'Error while fetching data' });
  } finally {
    db.release();
  }
};

// @desc Get Single Hotel
// @route /api/hotel/getAll
// @access PUBLIC

export const getSingleHotelController = async (
  req: RequestUser,
  res: Response
) => {
  const db = await pool.connect();
  const { id } = req.params;
  try {
    // const { rows } = await db.query(
    //   'SELECT * FROM hotels WHERE id=$1 AND user_id=$2',
    //   [id, req.user?.id]
    // );
    const { rows } = await db.query('SELECT * FROM hotels WHERE id=$1', [id]);
    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(400).json({ message: 'Error while fetching data' });
  } finally {
    db.release();
  }
};

export const editHotelController = async (req: RequestUser, res: Response) => {
  const db = await pool.connect();
  try {
    const validations = hotelFormSchema.safeParse(req.body);
    if (!validations.success) {
      return res.status(400).json(validations.error.flatten().fieldErrors);
    }

    let {
      id,
      name,
      city,
      country,
      description,
      type,
      star_rating,
      facilities,
      adult_count,
      child_count,
      price_per_night,
      image_urls,
    } = validations.data;
    const imageFiles = req.files as Express.Multer.File[];
    const imageUrls = await uploadImages(imageFiles);
    let allImageUrls;
    if (image_urls) {
      allImageUrls = [...image_urls, ...imageUrls];
    }
    const data = {
      name: name,
      city: city,
      country: country,
      description: description,
      type: type,
      adult_count: adult_count,
      child_count: child_count,
      facilities: facilities,
      price_per_night: price_per_night,
      star_rating: star_rating,
      image_urls: allImageUrls,
      id: id,
      user_id: req.user?.id,
      updated_at: new Date(),
    };

    const { rows } = await db.query(
      'UPDATE hotels SET name=$1,city=$2,country=$3,description=$4,type=$5,adult_count=$6,child_count=$7,facilities=$8,price_per_night=$9,star_rating=$10,image_urls=$11,updated_at=$14 WHERE id=$12 AND user_id=$13 RETURNING updated_at',
      Object.values(data)
    );
    if (rows[0]) {
      res.status(200).json({ message: 'Hotel Updated Successfully' });
    } else {
      return res
        .status(400)
        .json({ message: 'Hotel Not Updated Successfully' });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong' });
  } finally {
    db.release();
  }
};

export const stripePaymentController = async (
  req: RequestUser,
  res: Response
) => {
  // we need three things to do payment
  // 1- Total price
  // 2- HotelId
  // 3- UserId
  const { hotelId } = req.params;
  const { totalNights } = req.body;
  const db = await pool.connect();
  try {
    const { rows } = await db.query(
      `SELECT price_per_night FROM hotels WHERE id=$1`,
      [hotelId]
    );
    const totalPrice = totalNights * rows[0].price_per_night;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: 'gbd',
      metadata: {
        userId: req.user!.id,
        hotelId: hotelId,
      },
    });
    if (!paymentIntent.client_secret) {
      return res.status(400).json({ message: 'Payment Intent error' });
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalPrice,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong' });
  } finally {
    db.release();
  }
};

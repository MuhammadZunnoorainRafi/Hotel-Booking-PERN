const { Pool } = require('pg');

const createUserTable = async (db) => {
  await db.query(`CREATE TABLE IF NOT EXISTS users(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
  )`);
};

const createHotelTable = async (db) => {
  await db.query(`CREATE TABLE IF NOT EXISTS hotels(
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      name VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      country VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      type VARCHAR(255) NOT NULL,
      adult_count INTEGER NOT NULL,
      child_count INTEGER NOT NULL,
      facilities TEXT[],
      price_per_night DECIMAL(10,2) NOT NULL,
      star_rating INTEGER NOT NULL CHECK (star_rating BETWEEN 1 AND 5),
      image_urls TEXT[],
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
  )`);
};

const main = async () => {
  const pool = new Pool({
    connectionString: process.env.POSTGRESQL_URI,
  });
  const db = await pool.connect();
  await createUserTable(db);
  await createHotelTable(db);
  db.release();
};

main().catch((error) => {
  console.log(
    'An error occurred while to attempting to seed the database: ',
    error
  );
});

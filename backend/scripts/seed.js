const { Pool } = require('pg');

const seedUsers = async (db) => {
  await db.query(`CREATE TABLE IF NOT EXISTS users(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '0 seconds'
  )`);
  // return { usersTable };
};

const main = async () => {
  const pool = new Pool({
    connectionString: process.env.POSTGRESQL_URI,
  });
  const db = await pool.connect();
  await seedUsers(db);
  db.release();
};

main().catch((error) => {
  console.log(
    'An error occurred while to attempting to seed the database: ',
    error
  );
});

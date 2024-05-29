import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.POSTGRESQL_URI,
  //   database: process.env.DATABASE,
  //   host: process.env.HOST,
  //   port: +process.env.PORT!,
  //   user: process.env.USER,
  //   password: process.env.PASSWORD,
});

export const executeQuery = async (sql: any, values: any = []) => {
  try {
    const db = await pool.connect();
    const { rows } = await db.query(sql, values);
    db.release();
    return rows[0];
  } catch (error) {
    console.log(error);
    throw new Error('Error while executing query');
  }
};

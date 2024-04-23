import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRESQL_URI,
});

export const executeQuery = async (sql: any, values: any) => {
  try {
    const db = await pool.connect();
    const {} = await db.query(sql, values);
  } catch (error) {}
};

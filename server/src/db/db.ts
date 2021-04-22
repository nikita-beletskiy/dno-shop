import { Pool, QueryArrayConfig } from 'pg';

const connectionString = process.env.POSTGRES_URI;
const pool = new Pool({ connectionString });

export const db = {
  query: (text: String, params?: any) =>
    pool.query({ text } as QueryArrayConfig, params)
};

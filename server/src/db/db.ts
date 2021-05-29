import { Pool, QueryArrayConfig } from 'pg';

export const db = {
  query: (text: String, params?: any) =>
    new Pool({ connectionString: process.env.POSTGRES_URI }).query(
      { text } as QueryArrayConfig,
      params
    )
};

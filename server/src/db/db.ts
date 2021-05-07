import { Pool, QueryArrayConfig } from 'pg';

const connectionString = process.env.POSTGRES_URI;
const pool = new Pool({ connectionString });

export const db = {
  query: (text: String, params?: any) =>
    pool.query({ text } as QueryArrayConfig, params)
};

// Describes the shape of data that is returned by node-postgres library
export interface DatabaseResponseObject {
  [key: string]: number | string | null;
}

export enum UserColumns {
  id = 'id',
  email = 'email',
  password = 'password',
  phone = 'phone',
  first_name = 'first_name',
  last_name = 'last_name',
  nickname = 'nickname',
  image = 'image',
  gender = 'gender',
  date_of_birth = 'date_of_birth',
  wishlist = 'wishlist',
  cart = 'cart'
}

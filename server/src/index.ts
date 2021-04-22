import { db } from './db/db';
import express from 'express';
import cookieSession from 'cookie-session';

const app = express();

app.set('trust proxy', true);
app.use(cookieSession({ signed: false, secure: false }));

app.use(express.json());

const start = async () => {
  console.log('Starting Server...');

  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');
  if (!process.env.POSTGRES_URI)
    throw new Error('POSTGRES_URI must be defined');

  try {
    const state = await db.query(
      `SELECT state FROM pg_stat_activity WHERE datname = 'dnodb'`
    );
    console.log('PostgreSQL status:', state.rows[0]);

    app.listen(3000, () => {
      console.log('Listening on port 3000');
    });
  } catch (error) {
    console.log(error);
  }
};

start();

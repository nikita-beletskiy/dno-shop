import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import cookieSession from 'cookie-session';

import { User } from './entity/User';
import { Product } from './entity/Product';

import { getCurrentUser } from './middleware/get-current-user';
import { errorHandler } from './middleware/error-handler';

import { NotFoundError } from './errors/not-found-error';

import { currentUserRouter } from './routes/auth/current-user';
import { signupRouter } from './routes/auth/signup';
import { signinRouter } from './routes/auth/signin';
import { signoutRouter } from './routes/auth/signout';
import { deleteAccountRouter } from './routes/user-account/delete-account';
import { updateAccountRouter } from './routes/user-account/update';
import { getOneProductRouter } from './routes/products/get-one';
import { getAllProductsRouter } from './routes/products/get-all';
import { updateProductsRouter } from './routes/user-account/update-products';

const app = express();

app.set('trust proxy', true);
app.use(cookieSession({ signed: false, secure: false }));

app.use(express.json());
app.use(getCurrentUser);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(deleteAccountRouter);
app.use(updateAccountRouter);
app.use(getOneProductRouter);
app.use(getAllProductsRouter);
app.use(updateProductsRouter);

app.all('*', (req, res, next) =>
  next(new NotFoundError('Requested route not found'))
);

// This middleware fires when some error occurs in app. Then it checks whether the error is an instance of BaseCustomErrors abstract class and sends an appropriate response.
app.use(errorHandler);

if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');
if (!process.env.POSTGRES_URI) throw new Error('POSTGRES_URI must be defined');

createConnection({
  type: 'postgres',
  url: process.env.POSTGRES_URI,
  entities: [User, Product],
  logging: true,
  synchronize: true
})
  .then(() => {
    console.log('Connected to PostgreSQL!');
    app.listen(3000, () => console.log('Listening on port 3000'));
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

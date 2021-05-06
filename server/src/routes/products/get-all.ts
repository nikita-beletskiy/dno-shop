import { db } from '../../db/db';
import { Router } from 'express';
import { NotFoundError } from '../../errors/not-found-error';

const router = Router();

router.get('/api/products/all/:category', async (req, res, next) => {
  await db
    .query(`SELECT * FROM products WHERE category = $1`, [req.params.category])
    .then(result =>
      result.rows.length ? res.send(result.rows) : next(new NotFoundError())
    )
    .catch(err => next(new Error(err)));
});

export { router as getAllProductsRouter };

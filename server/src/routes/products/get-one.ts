import { db } from '../../db/db';
import { Router } from 'express';
import { NotFoundError } from '../../errors/not-found-error';

const router = Router();

router.get('/api/products/one/:id', async (req, res, next) => {
  await db
    .query(`SELECT * FROM products WHERE id = $1`, [req.params.id])
    .then(result =>
      result.rows[0] ? res.send(result.rows[0]) : next(new NotFoundError())
    )
    .catch(err => next(new Error(err.message)));
});

export { router as getOneProductRouter };

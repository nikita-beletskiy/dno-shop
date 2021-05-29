import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../../entity/Product';
import { NotFoundError } from '../../errors/not-found-error';

const router = Router();

router.get('/api/products/one/:id', async (req, res, next) => {
  await getRepository(Product)
    .findOne(req.params.id)
    .then(product =>
      product
        ? res.send(product)
        : next(
            new NotFoundError(`What a mysterious product you're looking for...`)
          )
    )
    .catch(err => next(new Error(err.message)));
});

export { router as getOneProductRouter };

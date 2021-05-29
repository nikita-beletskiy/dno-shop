import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../../entity/Product';
import { NotFoundError } from '../../errors/not-found-error';

const router = Router();

router.get('/api/products/all/:category', async (req, res, next) => {
  await getRepository(Product)
    .find({ category: req.params.category })
    .then(products =>
      products
        ? res.send(products)
        : next(new NotFoundError(`I'm afraid we don't have what you need...`))
    )
    .catch(err => next(new Error(err.message)));
});

export { router as getAllProductsRouter };

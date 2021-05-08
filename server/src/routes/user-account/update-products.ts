import { DatabaseResponseObject, db, UserColumns } from '../../db/db';
import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middleware/validate-request';
import { requireAuth } from '../../middleware/require-auth';
import { BadRequestError } from '../../errors/bad-request-error';

const router = Router();
router.patch(
  '/api/users/currentuser/update-products',
  requireAuth,
  [
    body('product_id')
      .notEmpty()
      .withMessage(`How'd you do that? It's not valid product_id at all!`)
      .isLength({ min: 36, max: 36 })
      .withMessage('What a weird value you put here...')
  ],
  validateRequest, // Custom middleware that will inspect 'req' object after 'body' function checked it for incorrect data and possibly set some errors on it
  [
    // This validation step involves DB query, so it'll be made only after previous validation steps were completed without issues, which guarantees that the query will be made with 100% valid data so it won't be wasteful
    body('product_id').custom(async product_id => {
      if (
        (((
          await db.query(`SELECT quantity FROM products WHERE id = $1`, [
            product_id
          ])
        ).rows[0] as unknown) as DatabaseResponseObject).quantity === 0
      )
        throw new Error(`Apparently it's already sold out...`);
    })
  ],
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    const { wishlist, cart, product_id } = req.body;

    const columns = Object.keys(UserColumns)
      .filter(attr => attr !== UserColumns.password)
      .join();

    !wishlist && !cart
      ? next(new BadRequestError('What you wanna do with this product?'))
      : wishlist && cart
      ? next(
          new BadRequestError(
            `Oh, this is a really bad request... But I got this, don't worry`
          )
        )
      : db
          .query(
            `UPDATE users SET ${
              cart
                ? `cart = case WHEN cart @> '{${product_id}}' = false THEN array_append(cart, $1) ELSE array_remove(cart, $1)`
                : `wishlist = case WHEN wishlist @> '{${product_id}}' = false THEN array_append(wishlist, $1) ELSE array_remove(wishlist, $1)`
            } END WHERE id = $2 RETURNING ${columns}`,
            [product_id, req.currentUser!.id]
          )
          .then(result => res.send(result.rows[0]))
          .catch(err => next(new Error(err.message)));
  }
);

export { router as updateProductsRouter };

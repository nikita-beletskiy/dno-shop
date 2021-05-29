import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { getRepository } from 'typeorm';
import { Product } from '../../entity/Product';
import { User } from '../../entity/User';
import { validateRequest } from '../../middleware/validate-request';
import { requireAuth } from '../../middleware/require-auth';
import { BadRequestError } from '../../errors/bad-request-error';
import { NotFoundError } from '../../errors/not-found-error';

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
  async (req: Request, res: Response, next: NextFunction) => {
    const { wishlist, cart, product_id, remove } = req.body;
    let user: User | undefined | void;

    !wishlist && !cart
      ? next(new BadRequestError('What you wanna do with this product?'))
      : wishlist && cart
      ? next(
          new BadRequestError(
            `Oh, this is a really bad request... But I got this, don't worry`
          )
        )
      : (user = await getRepository(User)
          .findOne(req.currentUser!.id)
          .catch(err => next(new Error(err.message))));

    // There's no functionality to update user's cart with certain amount of products
    if (user)
      remove
        ? getRepository(User)
            .createQueryBuilder()
            .update<User>(
              User,
              cart
                ? { cart: user.cart.filter(id => id !== product_id) }
                : { wishlist: user.wishlist.filter(id => id !== product_id) }
            )
            .returning(cart ? ['cart'] : ['wishlist'])
            .execute()
            .then(result => res.send(...result.raw))
            .catch(err => next(new Error(err.message)))
        : wishlist
        ? product_id === user.wishlist.find(id => id === product_id)
          ? res.send({ wishlist: user.wishlist })
          : (await getRepository(Product)
              .findOne(product_id)
              .catch(err => next(new Error(err.message))))
          ? getRepository(User)
              .createQueryBuilder()
              .update<User>(User, {
                wishlist: user.wishlist.concat(product_id)
              })
              .returning(['wishlist'])
              .execute()
              .then(result => res.send(...result.raw))
              .catch(err => next(new Error(err.message)))
          : next(new NotFoundError('Wrong product id!'))
        : getRepository(Product)
            .findOne(product_id)
            .then(product =>
              !product
                ? next(new NotFoundError('Wrong product id!'))
                : product.quantity === 0
                ? next(
                    new BadRequestError(
                      `I'm sorry, but apparently it's already sold out...`
                    )
                  )
                : getRepository(User)
                    .createQueryBuilder()
                    .update<User>(User, {
                      // Weird that Typescript thinks that user may not exist...
                      cart: (user as User).cart.concat(product_id)
                    })
                    .returning(['cart'])
                    .execute()
                    .then(result => res.send(...result.raw))
                    .catch(err => next(new Error(err.message)))
            )
            .catch(err => next(new Error(err.message)));
  }
);

export { router as updateProductsRouter };

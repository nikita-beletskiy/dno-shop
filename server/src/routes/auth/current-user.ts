import { Router } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';

const router = Router();

// getCurrentUser middleware augments Express.Request object so that it has a currentUser property. Then it checks whether or not there is a cookie set on that object. If there is some cookie, middleware tries to verify it. If there is no cookie or if verification fails req.currentUser remains undefined. If verification is successful its result gets assigned to req.currentUser. So response will always actual current user data or null if req.currentUser is undefined.
router.get('/api/users/currentuser', (req, res, next) => {
  // If there is some cookie set on a client, but there is no corresponding user in DB currentUser will be undefined

  req.currentUser?.id
    ? getRepository(User)
        .findOne(req.currentUser.id)
        .then(user =>
          user
            ? res.send({ currentUser: User.removePassword(user) })
            : res.send({ currentUser: null })
        )
        .catch(err => next(new Error(err.message)))
    : res.send({ currentUser: null });
});

export { router as currentUserRouter };

import { Router } from 'express';

import { validationHandler } from '../../libs/routes/validationHandler';
import cartController from './CartController';
import validation from './validation';

const router = Router();

// router.route('/').get(...validationHandler(validation.list), cartController.list);

router
  .route('/:id')
  .get(...validationHandler(validation.get), cartController.getCart);

// router.route('/').post(...validationHandler(validation.create), cartController.create);

router
  .route('/add/:id')
  .put(...validationHandler(validation.update), cartController.addItemToCart);

router
  .route('/empty/:id')
  .put(...validationHandler(validation.update), cartController.emptyCart);

export default router;

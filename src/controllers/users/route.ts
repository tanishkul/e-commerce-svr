import { Router } from 'express';

import { validationHandler } from '../../libs/routes/validationHandler';
import userController from './UserController';
import validation from './validation';

const router = Router();

router
  .route('/')
  .get(...validationHandler(validation.list), userController.list);

router
  .route('/:id')
  .get(...validationHandler(validation.get), userController.get);

router
  .route('/')
  .post(...validationHandler(validation.create), userController.create);

router
  .route('/login')
  .post(...validationHandler(validation.login), userController.login);

router
  .route('/:id')
  .put(...validationHandler(validation.update), userController.update);

router
  .route('/:id')
  .delete(...validationHandler(validation.delete), userController.delete);
export default router;

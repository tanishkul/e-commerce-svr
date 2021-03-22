import { Router } from 'express';

import { validationHandler } from '../../libs/routes/validationHandler';
import productController from './ProductController';
import validation from './validation';

const router = Router();

router.route('/').get(...validationHandler(validation.list), productController.list);

router.route('/:id').get(...validationHandler(validation.get), productController.get);

router.route('/').post(...validationHandler(validation.create), productController.create);

router.route('/:id').put(...validationHandler(validation.update), productController.update);

router.route('/:id').delete(...validationHandler(validation.delete), productController.delete);
export default router;

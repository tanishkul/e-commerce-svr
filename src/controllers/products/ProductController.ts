import { NextFunction, Request, Response } from 'express';

import successHandler from '../../middlewares/successHandler';
import { ProductService } from '../../services';
import { SUCCESS_MSG } from './../../libs/constants';

class ProductController {
  public static getInstance() {
    if (!ProductController.instance) {
      ProductController.instance = new ProductController();
    }

    return ProductController.instance;
  }
  private static instance: ProductController;
  private productService: ProductService;

  /* tslint:disable: no-null-keyword */
  private constructor() {
    this.productService = new ProductService();
  }

  /**
   * Get Product list.
   * @param {number} skip - Number of Product to be skipped.
   * @param {number} limit - Limit number of Product to be returned.
   * @returns {IProduct[]}
   */
  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, skip } = req.query as any;
      const result = await ProductController.getInstance().productService.list(
        limit,
        skip,
      );
      if (!result.length) {
        return res.send(successHandler(SUCCESS_MSG.NO_RECORDS, result));
      }
      return res.send(successHandler(SUCCESS_MSG.FETCH, result));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Product
   * @param {string} id - Id of Product
   * @returns {IProduct}
   */
  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await ProductController.getInstance().productService.get({
        originalId: id,
      });
      return res.send(successHandler(SUCCESS_MSG.FETCH, result));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new Product
   * @param {string} fieldsResponse - FieldsResponse of Product
   * @param {string} id - Id of Product Type
   * @param {string} stackId - Id of Stack
   * @returns {IProduct}
   */
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('ProductController - create', req.body);
      const { title, description, price } = req.body;
      const result = await ProductController.getInstance().productService.create(
        {
          description,
          price,
          title,
        },
      );
      return res.send(successHandler(SUCCESS_MSG.CREATE, result));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update the Product
   * @param {string} id - Id of Product
   * @param {string} fieldsResponse - FieldsResponse of Product
   * @returns {IProduct}
   */
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = JSON.parse(JSON.stringify(req.body));
      const result = await ProductController.getInstance().productService.update(
        {
          ...data,
          id,
        },
      );
      return res.send(successHandler(SUCCESS_MSG.UPDATE, result));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete the Product
   * @param {string} id - Id of Product
   * @returns {IProduct}
   */
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await ProductController.getInstance().productService.delete(
        {
          id,
        },
      );
      return res.send(successHandler(SUCCESS_MSG.DELETE, result));
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController.getInstance();

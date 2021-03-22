import { NextFunction, Request, Response } from 'express';

import { SUCCESS_MSG } from '../../libs/constants';
import successHandler from '../../middlewares/successHandler';
import { CartService } from '../../services';

class CartController {
  public static getInstance() {
    if (!CartController.instance) {
      CartController.instance = new CartController();
    }

    return CartController.instance;
  }
  private static instance: CartController;
  private cartService: CartService;

  /* tslint:disable: no-null-keyword */
  private constructor() {
    this.cartService = new CartService();
  }

  /**
   * Get Cart
   * @param {string} id - Id of Cart
   * @returns {ICart}
   */
  public async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await CartController.getInstance().cartService.get({
        originalId: id,
      });
      return res.send(successHandler(SUCCESS_MSG.FETCH, result));
    } catch (error) {
      next(error);
    }
  }


  /**
   * Update the Cart
   * @param {string} id - Id of Cart
   * @param {string} fieldsResponse - FieldsResponse of Cart
   * @returns {ICart}
   */
  public async addItemToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = JSON.parse(JSON.stringify(req.body));
      const result = await CartController.getInstance().cartService.update(
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
   * Update the Cart
   * @param {string} id - Id of Cart
   * @param {string} fieldsResponse - FieldsResponse of Cart
   * @returns {ICart}
   */
  public async emptyCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = JSON.parse(JSON.stringify(req.body));
      const result = await CartController.getInstance().cartService.emptyCart(
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
}

export default CartController.getInstance();

import {
  ERR_MSG,
  ErrorParameter,
  RequestParameter,
} from '../../libs/constants';
import { createErrorResponse } from '../../libs/utilities';
import CartRepository from '../../repositories/business/cart/repository';

class CartService {
  // tslint:disable-next-line:variable-name
  private _cartRepository: CartRepository;

  public constructor() {
    this._cartRepository = new CartRepository();
  }
  public async list(limit?: number, skip?: number) {
    return this._cartRepository.list({ limit, skip });
  }

  public async get(query: any) {
    const { originalId } = query;
    let error = [];
    const result = await this._cartRepository.get(query);
    if (!result) {
      error = createErrorResponse(
        RequestParameter.QUERY,
        ErrorParameter.NO_CART,
        ErrorParameter.ID,
        originalId,
      );
      throw {
        data: error,
        message: ERR_MSG.CART_DOES_NOT_EXIST,
        type: 'BadRequestError',
      };
    }
    return result;
  }

  public async create(query: any) {
    return await this._cartRepository.create(query);
  }

  public async update(query: any) {
    let error = [];
    await this.get({ originalId: query.id });
    const result = await this._cartRepository.update(query);

    if (!result) {
      error = createErrorResponse(
        RequestParameter.BODY,
        ErrorParameter.SOMETHING_WENT_BAD,
        '',
        '',
      );
      throw {
        data: error,
        message: ERR_MSG.UNABLE_TO_UPDATE,
        type: 'BadRequestError',
      };
    }

    return result;
  }

  public async emptyCart(query: any) {
    let error = [];
    await this.get({ originalId: query.id });
    const result = await this._cartRepository.update({ ...query, cart: [] });

    if (!result) {
      error = createErrorResponse(
        RequestParameter.BODY,
        ErrorParameter.SOMETHING_WENT_BAD,
        '',
        '',
      );
      throw {
        data: error,
        message: ERR_MSG.UNABLE_TO_UPDATE,
        type: 'BadRequestError',
      };
    }

    return result;
  }

  public async delete(query: any) {
    const { id } = query;
    let error = [];
    await this.get({ originalId: id });
    const result = await this._cartRepository.delete({ id });
    if (!result) {
      error = createErrorResponse(
        RequestParameter.BODY,
        ErrorParameter.SOMETHING_WENT_BAD,
        '',
        '',
      );
      throw {
        data: error,
        message: ERR_MSG.UNABLE_TO_DELETE,
        type: 'BadRequestError',
      };
    }
    return result;
  }
}

export default CartService;

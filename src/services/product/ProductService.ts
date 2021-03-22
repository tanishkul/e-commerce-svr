import ProductRepository from '../../repositories/business/product/repository';
import {
  ERR_MSG,
  ErrorParameter,
  RequestParameter,
} from './../../libs/constants';
import { createErrorResponse } from './../../libs/utilities';

class ProductService {
  // tslint:disable-next-line:variable-name
  private _productRepository: ProductRepository;

  public constructor() {
    this._productRepository = new ProductRepository();
  }
  public async list(limit?: number, skip?: number) {
    return this._productRepository.list({ limit, skip });
  }

  public async get(query: any) {
    const { originalId } = query;
    let error = [];
    const result = await this._productRepository.get(query);
    if (!result) {
      error = createErrorResponse(
        RequestParameter.QUERY,
        ErrorParameter.NO_PRODUCT,
        ErrorParameter.ID,
        originalId,
      );
      throw {
        data: error,
        message: ERR_MSG.PRODUCT_DOES_NOT_EXIST,
        type: 'BadRequestError',
      };
    }
    return result;
  }

  public async create(query: any) {
    return await this._productRepository.create(query);
  }

  public async update(query: any) {
    let error = [];
    await this.get({ originalId: query.id });
    const result = await this._productRepository.update(query);

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
    const result = await this._productRepository.delete({ id });
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

export default ProductService;

import * as mongoose from 'mongoose';

import { Nullable } from '../../../libs/Nullable';
import VersioningRepository from '../../versionable/VersioningRepository';
import {
  IQueryCreate,
  IQueryDelete,
  IQueryGet,
  IQueryList,
  IQueryUpdate,
} from './entities';
import IProductModel from './IModel';
import { productModel } from './model';

export default class ProductRepository extends VersioningRepository<
  IProductModel,
  mongoose.Model<IProductModel>
> {
  constructor() {
    super(productModel);
  }
  /**
   * Get product list.
   * @property {number} skip - Number of records to be skipped.
   * @property {number} limit - Limit number of records to be returned.
   * @returns {Product[]}
   */
  public async list(
    options: IQueryList,
    query: any = {},
  ): Promise<IProductModel[]> {
    options.sort = 'name';
    console.log('Product - List query: ', options);
    return super.getAll(query, options);
  }

  /**
   * Get product.
   * @property {string} id - _id of the record
   * @returns {Product}
   */
  public async get(query: IQueryGet): Promise<Nullable<IProductModel>> {
    console.log('ProductRepository - Get: ', query);
    return super.getByQuery(query);
  }

  public async getQuery(options: IQueryList): Promise<IProductModel[]> {
    console.log('Product - Get query: ', options);
    return super.getAll(options, {});
  }

  /**
   * Create new product
   * @property {string} name - The name of record.
   * @returns {Product}
   */
  public async create(options: IQueryCreate): Promise<IProductModel> {
    console.log('ProductRepository - Create: ');
    return super.create(options);
  }

  public async update(options: IQueryUpdate): Promise<IProductModel> {
    console.log('ProductRepository - update', options);
    const id = options.id;
    delete options.id;
    return super.update({ ...options, originalId: id });
  }

  /**
   * Delete product
   * @property {string} body.name - The name of record.
   * @returns {Product}
   */
  public async delete(query: IQueryDelete): Promise<IProductModel> {
    console.log('ProductRepository - Delete: ');
    return super.remove(query.id);
  }
}

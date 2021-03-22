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
import ICartModel from './IModel';
import { cartModel } from './model';

export default class CartRepository extends VersioningRepository<
  ICartModel,
  mongoose.Model<ICartModel>
> {
  constructor() {
    super(cartModel);
  }
  /**
   * Get cart list.
   * @property {number} skip - Number of records to be skipped.
   * @property {number} limit - Limit number of records to be returned.
   * @returns {Cart[]}
   */
  public async list(
    options: IQueryList,
    query: any = {},
  ): Promise<ICartModel[]> {
    options.sort = 'name';
    console.log('Cart - List query: ', options);
    return super.getAll(query, options);
  }

  /**
   * Get cart.
   * @property {string} id - _id of the record
   * @returns {Cart}
   */
  public async get(query: IQueryGet): Promise<Nullable<ICartModel>> {
    console.log('CartRepository - Get: ', query);
    return super.getByQuery(query);
  }

  public async getQuery(options: IQueryList): Promise<ICartModel[]> {
    console.log('Cart - Get query: ', options);
    return super.getAll(options, {});
  }

  /**
   * Create new cart
   * @property {string} name - The name of record.
   * @returns {Cart}
   */
  public async create(options: IQueryCreate): Promise<ICartModel> {
    console.log('CartRepository - Create: ');
    return super.create(options);
  }

  public async update(options: IQueryUpdate): Promise<ICartModel> {
    console.log('CartRepository - update', options);
    const id = options.id;
    delete options.id;
    return super.update({ ...options, originalId: id });
  }

  /**
   * Delete cart
   * @property {string} body.name - The name of record.
   * @returns {Cart}
   */
  public async delete(query: IQueryDelete): Promise<ICartModel> {
    console.log('CartRepository - Delete: ');
    return super.remove(query.id);
  }
}

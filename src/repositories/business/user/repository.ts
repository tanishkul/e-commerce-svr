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
import IUserModel from './IModel';
import { userModel } from './model';

export default class UserRepository extends VersioningRepository<
  IUserModel,
  mongoose.Model<IUserModel>
> {
  constructor() {
    super(userModel);
  }
  /**
   * Get user list.
   * @property {number} skip - Number of records to be skipped.
   * @property {number} limit - Limit number of records to be returned.
   * @returns {User[]}
   */
  public async list(
    options: IQueryList,
    query: any = {},
  ): Promise<IUserModel[]> {
    options.sort = 'name';
    console.log('User - List query: ', options);
    return super.getAll(query, options);
  }

  /**
   * Get user.
   * @property {string} id - _id of the record
   * @returns {User}
   */
  public async get(query: IQueryGet): Promise<Nullable<IUserModel>> {
    console.log('UserRepository - Get: ', query);
    return super.getByQuery(query);
  }

  public async getQuery(options: IQueryList): Promise<IUserModel[]> {
    console.log('User - Get query: ', options);
    return super.getAll(options, {});
  }

  /**
   * Create new user
   * @property {string} name - The name of record.
   * @returns {User}
   */
  public async create(options: IQueryCreate): Promise<IUserModel> {
    console.log('UserRepository - Create: ');
    return super.create(options);
  }

  public async update(options: IQueryUpdate): Promise<IUserModel> {
    console.log('UserRepository - update', options);
    const id = options.id;
    delete options.id;
    return super.update({ ...options, originalId: id });
  }

  /**
   * Delete user
   * @property {string} body.name - The name of record.
   * @returns {User}
   */
  public async delete(query: IQueryDelete): Promise<IUserModel> {
    console.log('UserRepository - Delete: ');
    return super.remove(query.id);
  }
}

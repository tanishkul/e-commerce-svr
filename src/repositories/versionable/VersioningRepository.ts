import * as mongoose from 'mongoose';

import { generateObjectId, leanObject } from '../../libs/utilities';
import { IQueryBaseCreate, IQueryBaseUpdate } from '../entities';

export default class VersionableRepository<
  D extends mongoose.Document,
  M extends mongoose.Model<D>
> {
  private modelType: M;
  constructor(model: M) {
    this.modelType = model;
  }

  /**
   * Create new application
   * @property {string} body.name - The name of record.
   * @returns {Application}
   */
  public async create(options: IQueryBaseCreate): Promise<D> {
    console.log('BaseRepository - create:', JSON.stringify(options));
    const id = generateObjectId();

    const result = await this.modelType.create({
      ...options,
      _id: id,
      originalId: id,
    });

    return this.assignId(leanObject(result.toObject()));
  }

  public async update(options: IQueryBaseUpdate): Promise<D> {
    console.log('BaseRepository - Update:', JSON.stringify(options));
    console.log('Searching for previous valid object...', options.originalId);
    const previous = await this.getById(options.originalId);

    if (previous) {
      console.log('Got Previous valid object...', previous);
      const newInstance = Object.assign({}, previous, options);
      newInstance['_id'] = generateObjectId();
      delete newInstance.id;
      delete newInstance.updatedAt;

      console.log('Invalidating previous valid object...', newInstance);
      await this.invalidate(options.originalId);

      console.log('Creating new object...');
      const data = await this.modelType.create({
        ...newInstance,
      });
      console.log('Created new object...', data);
      return leanObject(data.toObject());
    }
  }

  protected async getAll(query: any = {}, options: any = {}): Promise<D[]> {
    options.limit = Number(options.limit) || 0;
    options.skip = Number(options.skip) || 0;
    query.deletedAt = undefined;
    console.log('getAll query: ', query);
    console.log('getAll options: ', options);
    const sort = options.sort || '';
    delete options.sort;
    query.deletedAt = { $exists: false };

    if (sort) {
      return this.modelType
        .find(query, {}, options)
        .sort(sort)
        .collation({ locale: 'en', strength: 1, caseLevel: false })
        .lean();
    }
    return this.modelType
      .find(query, {}, options)
      .collation({ locale: 'en', strength: 1 })
      .lean();
  }

  protected async getByQuery(query: any = {}): Promise<D> {
    console.log(query);
    const conditions = { deletedAt: undefined, ...query };
    console.log('BaseRepository - get:', JSON.stringify(conditions));

    const result = await this.modelType.findOne(conditions).lean();

    return this.assignId(leanObject(result));
  }

  protected async remove(id: string): Promise<D> {
    const result = await this.getById(id);
    if (result) {
      return await this.invalidate(id);
    }
    return undefined;
  }

  protected async invalidate(id: string | string[]): Promise<D> {
    const now = new Date();

    const criteria = {
      deletedAt: undefined,
      originalId: {
        $in: id,
      },
    };
    return await this.modelType
      .updateMany(criteria, { deletedAt: now }, { multi: true })
      .lean();
  }

  protected async getById(id: string) {
    console.log('BaseRepository - getById:', id);

    const conditions = {
      deletedAt: undefined,
      originalId: id,
    };
    const result = await this.modelType.findOne(conditions).lean();

    return this.assignId(leanObject(result));
  }

  protected async get(conditions: any, populate?: any | null) {
    console.log(
      'BaseRepository - get:',
      JSON.stringify(conditions),
      JSON.stringify(populate),
    );

    const result = populate
      ? await this.modelType.findOne(conditions).populate(populate).lean()
      : await this.modelType.findOne(conditions).lean();

    return this.assignId(leanObject(result));
  }

  protected assignId(result: any) {
    if (result && result.originalId && result.id !== result.originalId) {
      result.id = result.originalId;
    }
    return result;
  }
}

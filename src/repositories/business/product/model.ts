import * as mongoose from 'mongoose';

import IProductModel from './IModel';
import ProductSchema from './schema';

export const productSchema = new ProductSchema(
  {
    _id: String,
  },
  {
    collection: 'product',
    versionKey: false,
  },
);

export const productModel: mongoose.Model<IProductModel> = mongoose.model<IProductModel>(
  'product',
  productSchema,
  'product',
  true,
);

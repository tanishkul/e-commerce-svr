import * as mongoose from 'mongoose';

import ICartModel from './IModel';
import CartSchema from './schema';

export const cartSchema = new CartSchema(
  {
    _id: String,
  },
  {
    collection: 'cart',
    versionKey: false,
  },
);

export const cartModel: mongoose.Model<ICartModel> = mongoose.model<ICartModel>(
  'cart',
  cartSchema,
  'cart',
  true,
);

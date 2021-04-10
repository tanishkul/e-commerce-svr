import { SchemaDefinition, SchemaOptions } from 'mongoose';

import VersionableSchema from '../../versionable/VersionableSchema';

export default class CartSchema extends VersionableSchema {
  constructor(options: SchemaDefinition, collections: SchemaOptions) {
    const ItemSchema = {
      price: {
        required: true,
        type: Number,
      },
      productId: {
        required: true,
        type: String,
      },
      quantity: {
        required: true,
        type: Number,
      },
      subTotal: {
        required: true,
        type: Number,
      },
    };
    const baseSchema: SchemaDefinition = {
      ...options,
      items: {
        required: false,
        type: ItemSchema,
      },
      price: {
        required: true,
        type: Number,
      },
      title: {
        required: true,
        type: String,
      },
      userId: {
        required: true,
        type: String,
      },
    };
    super(baseSchema, collections);
  }
}

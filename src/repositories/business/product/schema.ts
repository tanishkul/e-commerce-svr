import { SchemaDefinition, SchemaOptions } from 'mongoose';

import VersionableSchema from '../../versionable/VersionableSchema';

export default class ProductSchema extends VersionableSchema {
  constructor(options: SchemaDefinition, collections: SchemaOptions) {
    const baseSchema: SchemaDefinition = {
      ...options,
      description: {
        required: false,
        type: String,
      },
      price: {
        required: true,
        type: Number,
      },
      title: {
        required: true,
        type: String,
      },
    };
    super(baseSchema, collections);
  }
}

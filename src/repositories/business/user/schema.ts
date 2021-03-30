import { SchemaDefinition, SchemaOptions } from 'mongoose';

import VersionableSchema from '../../versionable/VersionableSchema';

export default class UserSchema extends VersionableSchema {
  constructor(options: SchemaDefinition, collections: SchemaOptions) {
    const baseSchema: SchemaDefinition = {
      ...options,
      email: {
        required: true,
        type: String,
      },
      name: {
        required: true,
        type: String,
      },
      password: {
        required: true,
        type: String,
      },
      role: {
        enum: ['ADMIN', 'CUSTOMER'],
        required: true,
        type: String,
      },
    };
    super(baseSchema, collections);
  }
}

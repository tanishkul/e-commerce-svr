import * as mongoose from 'mongoose';

class VersionableSchema extends mongoose.Schema {
  constructor(options: any, collections: any) {
    const versionedOptions = Object.assign(
      {
        createdAt: {
          default: Date.now,
          type: Date,
        },
        deletedAt: {
          required: false,
          type: Date,
        },
        originalId: {
          required: true,
          type: String,
        },
        updatedAt: {
          default: Date.now,
          type: Date,
        },
      },
      options,
    );
    super(versionedOptions, collections);
  }
}

export default VersionableSchema;

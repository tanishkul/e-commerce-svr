import * as mongoose from 'mongoose';

export default interface IVersionableDocument extends mongoose.Document {
  createdAt: Date;
  deletedAt: Date;
  originalId: string;
  updatedAt: Date;
}

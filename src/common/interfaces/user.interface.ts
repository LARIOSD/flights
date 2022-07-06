import { ObjectId } from 'mongoose';
export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface INewUser extends IUser {
  readonly _id: ObjectId;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

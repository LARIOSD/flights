import * as mongoose from 'mongoose';

export const PassengerSchema = new mongoose.Schema(
  {
    name: { type: String, requerid: true },
    email: { type: String, required: true },
  },
  { timestamps: true },
);

PassengerSchema.index({ name: 1 }, { unique: true });
PassengerSchema.index({ email: 1 }, { unique: true });

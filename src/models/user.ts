import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

export const user= mongoose.model("user", UserSchema);

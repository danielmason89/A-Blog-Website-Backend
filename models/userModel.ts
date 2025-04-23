import mongoose, { Model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

export interface IUser extends Document {
  email: string;
  password: string;
}

interface IUserModel extends Model<IUser> {
  signup(email: string, password: string): Promise<IUser>;
  login(email: string, password: string): Promise<IUser>;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static subscribe method
userSchema.statics.signup = async function (email: string, password: string) {
  // validation
  if (!email || !password) {
    throw Error("All field must be filled.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email in not valid.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough.");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use.");
  }
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (email: string, password: string) {
  if (!email || !password) {
    throw Error("All field must be filled.");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Invalid Login Credentials.");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid Login Credentials.");
  }
  return user;
};


export default mongoose.model<IUser, IUserModel>("User", userSchema);

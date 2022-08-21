import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  hashPassword: {
    type: String,
    required: false,
  },
  certification: {
    type: Boolean,
    default: false,
  },
  manager: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const comparePasswordResult = await bcrypt.compare(
    password,
    this.hashPassword
  );
  return comparePasswordResult;
};

UserSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};
UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username });
};

const User = mongoose.model("user", UserSchema);

export default User;

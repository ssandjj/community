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

// hash 패스워드 생성
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashPassword = hash;
};

// 패스워드 비교 함수
UserSchema.methods.checkPassword = async function (password) {
  const comparePasswordResult = await bcrypt.compare(
    password,
    this.hashPassword
  );
  return comparePasswordResult;
};

// certification -> true
UserSchema.methods.changeCertification = async function () {
  this.certification = true;
};

// 이메일 찾기
UserSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

// 닉네임 찾기
UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username });
};

const User = mongoose.model("user", UserSchema);

export default User;

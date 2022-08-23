import mongoose from "mongoose";

const { Schema } = mongoose;

const CertificationSchema = new Schema({
  email: {
    type: String,
  },
  number: {
    type: Number,
  },
});

// auth/ctrl/checkEmail에서 생성한 번호 저장.
CertificationSchema.methods.setNumber = async function (number) {
  this.number = number;
};

const Certification = mongoose.model("Certification", CertificationSchema);

export default Certification;

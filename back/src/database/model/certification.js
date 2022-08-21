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

CertificationSchema.methods.setNumber = async function (number) {
  this.number = number;
};

const Certification = mongoose.model("Certification", CertificationSchema);

export default Certification;

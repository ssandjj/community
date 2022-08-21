import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

export const checkObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    res.send("ObjectId 검증 실패").status(400);
    return;
  }
  next();
};

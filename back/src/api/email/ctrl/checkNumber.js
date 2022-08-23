import User from "../../../database/model/user";
import Certification from "../../../database/model/certification";

export const checkNumber = async (req, res) => {
  const { number, email } = req.body;

  try {
    const user = await User.findOne({ email });
    const certification = await Certification.findOne({ email });

    if (!user && !certification) {
      res
        .json({
          message: "api email checkNumber 데이터베이스 안에 값이 없습니다.",
          error: "api email checkNumber failure",
        })
        .status(400);
    }

    if (certification.number === Number(number)) {
      user.certification = true;
      user.save();

      res
        .json({
          message: "api email checkNumber 성공",
          data: "api email checkNumber success",
        })
        .status(200);
    } else {
      res
        .json({
          message: "값이 일치하지 않습니다.",
          error: "api email checkNumber 값 불일치",
        })
        .status(404);
    }
  } catch (err) {
    res
      .json({
        message: "api email checkNumber server error",
        error: err,
      })
      .status(500);
  }
};

import User from "../../../database/model/user";
import Certification from "../../../database/model/certification";

export const finalCheckEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    const certification = await Certification.findOne({
      email,
    });

    if (!user.certification) {
      await User.findOneAndDelete(user).exec();
      await Certification.findOneAndDelete(certification).exec();
      res
        .json({
          message: "api email finalCheckEmail 인증을 하지 않아 삭제합니다.",
          data: user,
        })
        .status(200);
    } else {
      await Certification.findOneAndDelete(certification).exec();
      res
        .json({
          message: "api email finalCheckEmail 인증 성공했습니다.",
          data: user,
        })
        .status(200);
    }
  } catch (e) {
    res
      .json({ message: "api email finalCheck server error", error: e })
      .status(500);
  }
};

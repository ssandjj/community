import User from "../../../database/model/user";
import Certification from "../../../database/model/certification";

export const checkNumber = async (req, res) => {
  const { number, email } = req.body;

  try {
    const user = await User.findOne({ email });
    const certification = await Certification.findOne({ email });
    if (certification.number === number) {
      await user.changeCertification;
      await user.save();
    } else {
      res
        .json({
          message: "값이 일치하지 않습니다.",
        })
        .status(404);
    }
  } catch (err) {
    res.send(err).status(500);
  }
};

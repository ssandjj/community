import User from "../../../database/model/user";
import Certification from "../../../database/model/certification";

export const finalCheckEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    const certification = await Certification.findOne({
      email,
    });

    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!user.certification) {
          User.findOneAndDelete({ user }).exec();
          Certification.findOneAndDelete({ certification }).exec();

          resolve("success user not certification");
        } else {
          Certification.findOneAndDelete({ certification }).exec();
          resolve("success user certification");
        }
      }, 1000);
    })
      .then((message) => {
        res.json({ message: message });
      })
      .catch((err) => {
        res.json({
          error: err,
          message: "error!!",
        });
      });
  } catch (e) {
    console.log(e);
  }
};

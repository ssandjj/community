import Joi from "joi";
import User from "../../../database/model/user";
import Certification from "../../../database/model/certification";

export const register = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .min(3)
      .max(50)
      .pattern(
        new RegExp(
          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
        )
      )
      .required(),
    username: Joi.string().alphanum().min(3).max(15).required(),
    password: Joi.string().required(),
  });

  const verification = schema.validate(req.body);

  if (verification.error) {
    res.send(err).status(400);
    return;
  }

  const { email, username, password } = req.body;
  req.session.userMail = email; // 세션 객체 사용.
  try {
    const certification = new Certification({ email });
    certification.save();

    const eamilExists = await User.findByEmail(email);
    const usernameExists = await User.findByUserName(username);

    if (eamilExists || usernameExists) {
      res
        .json({
          error: "이메일, 닉네임이 사용중 입니다.",
        })
        .status(409);
      return;
    }

    const user = new User({
      email,
      username,
      hashPassword: password,
    });

    await user.setPassword(password);
    await user.save();

    const userData = user.toJSON();
    delete userData.hashPassword;

    res.send(userData);
  } catch (err) {
    res.send(err).status(500);
  }
};

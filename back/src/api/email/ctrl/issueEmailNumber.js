import smtpTransport from "../../lib/Emailcertification";
import Certification from "../../../database/model/certification";
import Joi from "joi";
// 난수 생성 함수.
const generateRandom = (min, max) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

export const issueEmailNumber = async (req, res) => {
  const { email } = req.body;

  const certificationNumber = generateRandom(111111, 999999);

  try {
    const certification = await Certification.findOne({ email });

    if (!certification) {
      res.json({
        message: "api email issueEmailNumber database(not data)",
        error: "api email error 데이터베이스 데이터 조회 실패",
      });
      return;
    }

    await certification.setNumber(certificationNumber);
    certification.save();
    /*
    smtpTransport.sendMail(
      {
        from: process.env.NAVER_EMAIL,
        to: email,
        subject: "[인증] 회원가입 인증메일 입니다.",
        text:
          `숫자 6자리를 입력해주세요.

         인증 코드 :` + certificationNumber,
      },
      (err, info) => {
        if (err) {
          console.log(err);
          res.send(err).status(500);
        }
      }
    );
  */

    res
      .json({
        message: "api email issueEmailNumber success 발송 성공",
        data: certification,
      })
      .status(200);
  } catch (err) {
    res
      .json({
        message: "api email issueEmailNumber server error ",
        error: err,
      })
      .status(500);
  }
};

// const email = req.session.userMail;
// req.session.userNumber = certificationNumber;
// register에서 인증한 메일을 다시 프론트에서 받을 예정.
/**
 * 
 *   const { email } = req.body;

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
  });

  const verification = schema.validate(req.body);
  if (verification.error) {
    res
      .json({
        message: "api auth issueEmailNumber joi error",
        error: verification.error,
      })
      .status(400);
    return;
  }

 */

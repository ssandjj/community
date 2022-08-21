import smtpTransport from "../../lib/Emailcertification";
import Certification from "../../../database/model/certification";
const generateRandom = (min, max) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

export const checkEmail = async (req, res) => {
  const email = req.session.userMail;

  const certificationNumber = generateRandom(111111, 999999);
  console.log(certificationNumber);
  req.session.userNumber = certificationNumber;

  try {
    const certification = await Certification.findOne({ email });
    await certification.setNumber(certificationNumber);
    certification.save();

    smtpTransport.sendMail(
      {
        from: process.env.NAVER_EMAIL,
        to: email,
        subject: "[인증] 회원가입 인증메일 입니다.",
        text: "오른쪽 숫자 6자리를 입력해주세요." + certificationNumber,
      },
      (err, info) => {
        if (err) {
          console.log(err);
          res.send(err).status(500);
        }
      }
    );
    res.json({ message: "발송성공" }).status(200);
  } catch (err) {
    res.send(err).status(500);
  }
};

import nodemailer from "nodemailer";

const smtpTransport = nodemailer.createTransport({
  service: "naver",
  host: "smtp.naver.com",
  port: 465,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.NAVER_EMAIL,
    pass: process.env.NAVER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default smtpTransport;

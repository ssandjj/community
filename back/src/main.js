require("dotenv").config();
import express from "express";
import path from "path";
import expressSession from "express-session";

// database
import connect from "./database";

// login
import passport from "passport";
import passportConfig from "./passport";

// import API Router
import postsRouter from "./api/posts/index";
import authRouter from "./api/auth/index";

// import dev mode
import morgan from "morgan";

// use
const { PORT, MONGO_URI } = process.env;
connect(MONGO_URI); //데이터 베이스 연결
const app = express();
passportConfig(); // 패스포트 실행

// use Router
app.use(morgan("dev"));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(
  expressSession({
    secret: "123123123",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// use API Router
app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);

// listening
const port = PORT || 4000;
app.listen(port, () => {
  console.log(port + " port server on!");
});

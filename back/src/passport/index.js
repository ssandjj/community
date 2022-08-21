require("dotenv").config();

import passport from "passport";
import passportLocal from "passport-local";
import passportJWT from "passport-jwt";

import User from "../database/model/user";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = passportLocal.Strategy;

const passportConfig = () => {
  // jwt 로그인
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      (jwtPaylaod, done) => {
        return User.findOneById(jwtPaylaod.id)
          .then((user) => {
            return done(null, user);
          })
          .catch((err) => {
            return done(err);
          });
      }
    )
  );
};

export default passportConfig;

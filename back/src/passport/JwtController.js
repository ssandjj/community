require("dotenv").config();
import jwt from "jsonwebtoken";
import passport from "passport";

const JwtController = (req, res) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res
        .json({
          message: "Somthing is not right",
          user: user,
          error: err,
        })
        .status(400);
    }
    req.login(user, { sesstion: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
      return res.json({ user, token });
    })(req, res);
  });
};

export default JwtController;

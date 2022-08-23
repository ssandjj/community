import express from "express";

import { check } from "./ctrl/check";
import { login } from "./ctrl/login";
import { logout } from "./ctrl/logout";
import { register } from "./ctrl/register";

// 구현해야함
import { delte } from "./ctrl/delete";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/check", check);
authRouter.post("/logout", logout);

export default authRouter;

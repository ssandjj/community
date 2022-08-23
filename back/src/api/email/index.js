import express from "express";
import { issueEmailNumber } from "./ctrl/issueEmailNumber";
import { checkNumber } from "./ctrl/checkNumber";
import { finalCheckEmail } from "./ctrl/finalCheckEmail";

const emailRouter = express.Router();

emailRouter.post("/issue", issueEmailNumber);
emailRouter.post("/check", checkNumber);
emailRouter.delete("/finalcheck", finalCheckEmail);

export default emailRouter;

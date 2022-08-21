import express from "express";

// ctrl
import { list } from "./ctrl/list";
import { write } from "./ctrl/write";
import { read } from "./ctrl/read";
import { remove } from "./ctrl/remove";
import { update } from "./ctrl/update";

//middleware
import { checkObjectId } from "../lib/middleware/checkObjectId";

const postsRouter = express.Router();

postsRouter.get("/", list);
postsRouter.post("/", write);
//postsRouter.get("/:id", checkObjectId, read);
//postsRouter.delete("/:id", checkObjectId, remove);
//postsRouter.patch("/:id", checkObjectId, update);
postsRouter.route("/:id", checkObjectId).get(read).delete(remove).patch(update);

export default postsRouter;

import Post from "../../../database/model/post";
import Joi from "joi";

// post 1개를 데이터베이스에 저장한다.

export const write = async (req, res) => {
  // req.body 검증
  const schema = Joi.object().keys({
    // req.body의 필드 검증
    title: Joi.string().min(1).max(50).required(),
    body: Joi.string().min(1).required(),
    tags: Joi.array().items(Joi.string()),
  });

  const verification = schema.validate(req.body);

  console.log(verification);

  if (verification.error) {
    res.send(verification.error).status(400);
    return;
  }

  const { title, body, tags } = req.body;

  const post = new Post({
    title,
    body,
    tags,
  });
  try {
    await post.save();
    console.log(post);
    res.send(post);
  } catch (err) {
    console.log("error !!!!!! :", err);
    res.send(err).status(500);
  }
};

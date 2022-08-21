import Post from "../../../database/model/post";
import Joi from "joi";

// id에 해당하는 post의 내용을 업데이트한다.

export const update = async (req, res) => {
  //  req.body 검증
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const verification = schema.validate(req.body);
  if (verification.error) {
    res.send(verification.error).status(400);
    return;
  }

  const { id } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true, // true : 업데이트된 데이터 반환, false: 업데이트되기 전 데이터 반환.
    }).exec();
    if (!post) {
      res.send("not found post").status(404);
      return;
    }
    res.send(post);
  } catch (err) {
    console.log("error !!!!!! :", err);
    res.send(err).status(500);
  }
};

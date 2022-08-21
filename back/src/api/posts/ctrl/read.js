import Post from "../../../database/model/post";

// id값에 해당하는 post 1개를 불러온다.

export const read = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).exec();

    if (!post) {
      console.log(post);
      res.send("not found post").status(404);
      return;
    }
    console.log(post);
    post.views++;
    post.save();
    res.send(post);
  } catch (err) {
    console.log("error !!!!!! :", err);
    res.send(err).status(500);
  }
};

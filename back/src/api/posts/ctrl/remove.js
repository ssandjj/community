import Post from "../../../database/model/post";

// id에 해당하는 psot 1개를 삭제한다.

export const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await Post.findByIdAndRemove(id).exec();
    res.send("post delete success").status(204);
  } catch (e) {
    console.log("error !!!!!! :", err);
    res.send(err).status(500);
  }
};

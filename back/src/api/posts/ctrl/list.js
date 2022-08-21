import Post from "../../../database/model/post";

// Post의 전체 리스트를 불러온다.

export const list = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ _id: -1 }).lean().exec();
    // sort : 내림차순 (최신순)
    // lean json 형태로 조회
    const reducePosts = posts.map((post) => ({
      ...post,
      title: post.length < 30 ? post.title : `${post.title.slice(0, 30)}...`,
    }));
    console.log(reducePosts);
    res.send(reducePosts);
  } catch (err) {
    console.log("error !!!!!! :", err);
    res.send(err).status(500);
  }
};

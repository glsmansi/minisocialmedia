const Post = require("../models/Post");

module.exports.index = async (req, res) => {
  const posts = await Post.find({}).populate("author");
  res.render("posts/index", { posts });
};

module.exports.new = (req, res) => {
  res.render("posts/new");
};

module.exports.createPost = async (req, res) => {
  console.log(req.body);
  const post = new Post(req.body.post);
  console.log(req.file);
  (post.images = {
    url: req.file.path,
  }),
    (post.author = req.user._id);
  await post.save();
  console.log(post);

  res.redirect(`/posts/${post._id}`);
};

module.exports.show = async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!post) {
    return res.redirect("/posts");
  }
  res.render("posts/show", { post });
};

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const post = await Post.findByIdAndUpdate(id, {
    ...req.body.post,
  });
  imgs = req.file.map((f) => ({
    url: f.path,
  }));
  post.images.push(...imgs);
  await post.save();

  res.redirect(`/posts/${post._id}`);
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);

  res.redirect("/posts");
};

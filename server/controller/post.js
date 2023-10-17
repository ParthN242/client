import mongoose from "mongoose";
import PostsMessage from "../modules/postMessage.js";

export const getPost = async (req, res) => {
  try {
    const postMeassages = await PostsMessage.find();
    res.status(200).json(postMeassages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostsMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    // console.log("not in", post);
    // console.log("server", newPost);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  // console.log(id);
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Post With That Id.");

  const updatedPost = await PostsMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};
export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Post With That Id.");

  const post = await PostsMessage.findById(_id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const likedPost = await PostsMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(likedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Post With That Id.");

  await PostsMessage.findByIdAndRemove(id);

  res.json("message : Post successfully deleted");
};

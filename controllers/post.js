/** @format */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const postMessage = require("../models/postMessage");

const getPost = async (req, res) => {
  try {
    // res.send("okkkk");
    const postMessages = await postMessage.find();
    console.log(postMessages);
    res.status(200).json(postMessages);
    console.log(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new postMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
    console.log(newPost);
  } catch (error) {
    res.status(409).json({ message: { error } });
  }
};

const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  // const { title, message, creator, selectedFile, tags } = req.body;
  // const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Post with that id");
  const updatePost = await postMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true
    }
  );
  console.log(updatePost);
  res.json(updatePost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Post with that id");
  await postMessage.findByIdAndRemove(id);
  console.log("delete");
  res.json({ message: "remove successfully" });
};

// const likePost = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send("No Post with that id");
//   const post = await postMessage.findById(id);
//   const updatePost = await postMessage.findByIdAndUpdate(
//     id,
//     {
//       likeCount: post.likeCount + 1
//     },
//     { new: true }
//   );
//   res.json(updatePost);
// };

const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await postMessage.findById(id);

  const updatedPost = await postMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );
  console.log("like");
  res.json(updatedPost);
};
module.exports = { getPost, createPost, updatePost, deletePost, likePost };

/** @format */
let express = require("express");
let router = express.Router();
const postMessage = require("../models/postMessage");
// import { getPost, createPost } from "../controllers/post";
const cr = require("../controllers/post");
router.get("/", cr.getPost);
router.post("/", cr.createPost);
router.patch("/:id", cr.updatePost);
router.delete("/:id", cr.deletePost);
router.patch("/:id/likePost", cr.likePost);

// router.get("/", async (req, res) => {
//   const postMessages = await postMessage.find();
//   res.status(200).json(postMessages);
//   console.log(postMessages);
// });
// router.post("/", async (req, res) => {
//   const post = req.body;
//   const newPost = new postMessage({
//     title: req.body.title
//   });
//   let data = await newPost.save();
//   res.status(201).json(newPost);
//   console.log(data);
// });
module.exports = router;

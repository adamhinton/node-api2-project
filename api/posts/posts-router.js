// implement your posts router here
const express = require("express");
const Post = require("./posts-model");
const router = express.Router();

// router.get("/api/posts", (req, res) => {
//   Post.find(req.query).then((posts) => {
//     res.status(200).json(posts);
//   });
// });

module.exports = router;

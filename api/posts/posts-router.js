// implement your posts router here
const express = require("express");
const Post = require("./posts-model");
const router = express.Router;

router.length("/api/posts", (req, res) => {
  Post.find(req.query);
});

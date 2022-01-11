// implement your posts router here
const { Router } = require("express");
const express = require("express");
const { route } = require("../server");
const Post = require("./posts-model");
const router = express.Router();

// router.get("/api/posts", (req, res) => {
//   Post.find(req.query).then((posts) => {
//     res.status(200).json(posts);
//   });
// });

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});
router.post("/", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

router.get("/:id/messages", (req, res) => {});
module.exports = router;

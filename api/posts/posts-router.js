// implement your posts router here
const { Router } = require("express");
const express = require("express");
// const { route } = require("../server");
const Post = require("./posts-model");
const router = express.Router();

// // router.get("/api/posts", (req, res) => {
// Post.find(req.query).then((posts) => {
//   res.status(200).json(posts);
// });
// // });

//Future Adam: don't be fooled by the /, this is /api/posts, all of them are.
router.get("/", (req, res) => {
  Post.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
    });
});

router.get("/:id", (req, res) => {});
router.post("/", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

router.get("/:id/messages", (req, res) => {});
module.exports = router;

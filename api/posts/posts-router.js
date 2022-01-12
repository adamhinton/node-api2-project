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
  Post.find()
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

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      post
        ? res.status(200).json(post)
        : res
            .status(404)
            .json({ message: "The post with the specified ID does not exist" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The post information could not be retrieved",
      });
    });
});

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Post.insert({ title, contents })
      //two thens is on purpose here
      .then(({ id }) => {
        return Post.findById(id);
      })
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => {
        console.log("error while saving post to database");
      });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      await Post.remove(req.params.id);
      res.json(post);
    }
  } catch (err) {
    res.status(500).json({ message: "The post could not be removed" });
  }
});

router.put("/:id", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    // console.log("dfjaiodfs");
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  } else {
    Post.findById(req.params.id)
      .then((post) => {
        if (!post) {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist" });
        } else {
          return Post.update(req.params.id, req.body);
        }
      })
      .then((data) => {
        if (data) {
          return Post.findById(req.params.id);
        }
      })
      .then((post) => {
        if (post) {
          res.json(post);
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "The post information could not be modified",
        });
      });
  }
});

//
router.get("/:id/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      const comments = await Post.findPostComments(req.params.id);
      res.json(comments);
    }
  } catch (err) {
    res.status(500).json({
      message: "The comments information could not be retrieved",
    });
  }
});
module.exports = router;

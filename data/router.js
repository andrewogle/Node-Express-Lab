const express = require("express");
const db = require("./db.js");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const post = await db.insert(req.body);
    if (post) {
      res.status(201).json(post);
    } else {
      res
        .status(400)
        .json({
          errorMessage: "Please provide title and contents for the post."
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        error: "There was an error while saving the post to the database"
      });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await db.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The post information could not be retrieved." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await db.remove(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The post could not be removed" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, contents } = req.body;
    if (title && contents) {
      const post = await db.update(req.params.id, req.body);
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    } else {
      res
        .status(400)
        .json({
          errorMessage: "Please provide title and contents for the post."
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});

module.exports = router;

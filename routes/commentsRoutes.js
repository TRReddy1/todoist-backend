const express = require("express");
const { comments } = require("../models");
const router = express.Router();
const { commentSchema } = require("../helpers/validations");
//create comment
router.post("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  // const { content } = req.body;
  try {
    const result = await commentSchema.validateAsync(req.body);
    const comment = await comments.create({ content: result.content, taskId });
    res.json(comment);
  } catch (error) {
    console.log(error);
    if (error.isJoi === true) return res.status(422).json(error.message);
    res.status(500).json(error);
  }
});

//get all comments in a task
router.get("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  try {
    const allCommentsInATask = await comments.findAll({
      where: { taskId },
      order: ["createdAt"],
    });
    res.json(allCommentsInATask);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//update a comment
router.put("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  // const { content } = req.body;
  try {
    // const updated = await comments.update({content:req.body.content}, { where: { id: commentId } });
    const result = await commentSchema.validateAsync(req.body);
    const updated = await comments.findOne({ where: { id: commentId } });
    updated.content = result.content ? result.content : updated.content;
    await updated.save();
    res.json(updated);
  } catch (err) {
    console.log(err);
    if (err.isJoi === true) return res.status(422).json(err.message);
    res.status(500).json(err);
  }
});

//delete a comment
router.delete("/:commentId", async (req, res) => {
  try {
    await comments.destroy({ where: { id: req.params.commentId } });
    res.status(200).json({ msg: "comment deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

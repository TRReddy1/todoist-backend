const express = require("express");
const { labels, tasks } = require("../models");
const router = express.Router();
const { labelSchema } = require("../helpers/validations");

//create a label
router.post("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  // const { name } = req.body;
  try {
    //for same label b/w different tasks
    //const found = await labels.findOne({ where: { name } });
    // let newLabel;
    //if (found) {
    //  newLabel = await labels.create({ name, id: found.id });
    //} else {
    const result = await labelSchema.validateAsync(req.body);
    const newLabel = await labels.create({ name: result.name });
    //}
    const task = await tasks.findByPk(taskId);
    task.addLabel(newLabel);
    res.json(newLabel);
  } catch (err) {
    console.log(err);
    if (err.isJoi === true) return res.status(422).json(err.message);
    res.status(500).json(err);
  }
});

//get all labels
router.get("/", async (req, res) => {
  try {
    const AllLables = await labels.findAll();
    res.json(AllLables);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get all label on a task
router.get("/taskId/:taskId", async (req, res) => {
  const { taskId } = req.params;
  try {
    const currTask = await tasks.findByPk(taskId);
    const data = await currTask.getLabels();
    // console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get all tasks with a label
router.get("/labelName/:labelName", async (req, res) => {
  const { labelName } = req.params;
  try {
    const currLabel = await labels.findAll({ where: { name: labelName } });
    // console.log(currLabel);
    const taskPromises = currLabel.map(async (curr) => {
      const task = await curr.getTasks();
      return task;
    });
    // console.log(taskPromises);
    const taskss = await Promise.all(taskPromises);
    // console.log(taskss);
    const data = taskss.flat();
    // console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

//update a label with labelid
router.put("/labelId/:labelId", async (req, res) => {
  const { labelId } = req.params;
  // const { name } = req.body;
  try {
    const result = await labelSchema.validateAsync(req.body);
    const updatedLabel = await labels.findOne({ where: { id: labelId } });
    updatedLabel.name = result.name ? result.name : updatedLabel.name;
    await updatedLabel.save();
    res.json(updatedLabel);
  } catch (err) {
    console.log(err);
    if (err.isJoi === true) return res.status(422).json(err.message);
    res.status(500).json(err.message);
  }
});

//delete a labelwith id
router.delete("/labelId/:labelId", async (req, res) => {
  const { labelId } = req.params;
  try {
    await labels.destroy({ where: { id: labelId } });
    res.status(200).json({ msg: "label deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

module.exports = router;

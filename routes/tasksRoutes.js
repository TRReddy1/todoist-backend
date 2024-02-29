const express = require("express");
const { projects, tasks, labels, sequelize } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();
const { taskSchema } = require("../helpers/validations");
//create a task
// method 1
router.post("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  // const { name, description } = req.body;
  try {
    const result = await taskSchema.validateAsync(req.body);
    const project = await projects.findOne({ where: { id: projectId } });
    const task = await project.createTask({
      name: result.name,
      description: result.description === undefined ? "" : result.description,
    });
    res.json(task);
  } catch (err) {
    console.log(err);
    if (err.isJoi === true) return res.status(422).json(err.message);
    res.status(500).json(err);
  }
});

// method 2
// router.post("/", async (req, res) => {
//   const { projectId, name, description } = req.body;
//   try {
//     const task = await tasks.create({
//       name: name,
//       description: description === undefined ? "" : description,
//       projectId: projectId,
//     });
//     res.json(task);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// get all tasks by projectId
router.get("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  try {
    const allTasks = await tasks.findAll({
      where: { projectId },
      order: ["createdAt"],
    });
    res.json(allTasks);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

//edit a task with task id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  // const { name, description } = req.body;
  try {
    const result = await taskSchema.validateAsync(req.body);
    const task = await tasks.findOne({ where: { id } });
    task.name = result.name ? result.name : task.name;
    task.description =
      result.description !== undefined ? result.description : task.description;

    await task.save();
    res.json(task);
  } catch (err) {
    console.log(err);
    if (err.isJoi === true) return res.status(422).json(err.message);
    res.status(500).json(err.message);
  }
});

//delete a task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await tasks.findOne({ where: { id } });
    // task.removeLabels();

    await task.destroy();

    await labels.destroy({
      where: {
        id: {
          [Op.notIn]: sequelize.literal(`(SELECT "labelId" FROM "tasklabels")`),
        },
      },
    });
    res.status(200).json({ msg: "deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

module.exports = router;

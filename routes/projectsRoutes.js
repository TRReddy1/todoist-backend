const { projectSchema } = require("../helpers/validations");
const express = require("express");
const { projects, users } = require("../models");
const userAuthenticate = require("../helpers/auth_user");
const router = express.Router();

//middleware
router.use("/", userAuthenticate);

//create a project
router.post("/", async (req, res) => {
  // const { name, is_favorite } = req.body;
  try {
    const result = await projectSchema.validateAsync(req.body);
    const { id } = req.user;
    const user = await users.findByPk(id);
    const project = await user.createProject({
      name: result.name,
      is_favorite:
        result.is_favorite === undefined ? false : result.is_favorite,
    });
    // await project.createTask({ name: "projects task" });
    res.json(project);
  } catch (err) {
    console.log(err);
    if (err.isJoi === true) {
      res.status(422).json(err.message);
      return;
    }
    res.status(500).json(err);
  }
});

//get all projects
router.get("/", async (req, res) => {
  try {
    const projectsdata = await projects.findAll({ order: ["createdAt"] });
    res.json(projectsdata);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get a single project by UUID
router.get("/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    const projectData = await projects.findOne({ where: { id: uuid } });
    res.json(projectData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//update a project/project details
router.put("/:uuid", async (req, res) => {
  const { uuid } = req.params;
  // const { name, is_favorite } = req.body;
  try {
    const result = await projectSchema.validateAsync(req.body);
    const updatedProject = await projects.findOne({ where: { id: uuid } });
    updatedProject.name = result.name ? result.name : updatedProject.name;
    updatedProject.is_favorite =
      result.is_favorite !== undefined
        ? result.is_favorite
        : updatedProject.is_favorite;

    await updatedProject.save();
    res.json(updatedProject);
  } catch (err) {
    console.log(err);
    if (err.isJoi) return res.status(422).json(err.message);
    res.status(500).json(err);
  }
});

//delete a project
router.delete("/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    const found = await projects.findOne({ where: { id: uuid } });
    await found.destroy();
    res.status(200).json({ msg: "deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "failed to delete" });
  }
});

module.exports = router;

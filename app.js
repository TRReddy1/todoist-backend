const express = require("express");
const app = express();
const cors = require("cors");
const {
  sequelize,
  // users,
  // projects,
  // tasks,
  // labels,
  // comments,
  // tasklabels,
} = require("./models");
require("dotenv").config();
app.use(cors());

app.use(express.json());

//users router
const userRouter = require("./routes/usersRoutes");
app.use("/todoist/users", userRouter);

// project router
const projectRouter = require("./routes/projectsRoutes");
app.use("/todoist/projects", projectRouter);

//task Router
const taskRouter = require("./routes/tasksRoutes");
app.use("/todoist/tasks", taskRouter);

//comments router
const commentRouter = require("./routes/commentsRoutes");
app.use("/todoist/comments", commentRouter);

//labels router
const labelRouter = require("./routes/labelsRoute");
app.use("/todoist/labels", labelRouter);

const PORT = 5000;
app.listen(PORT, async () => {
  console.log(`server running at port: ${PORT}`);
  await sequelize.sync();
  // await sequelize.authenticate();
  // console.log(users.associations);
  // console.log(projects.associations);
  // console.log(tasks.associations);
  // console.log(labels.associations);
  // console.log(comments.associations);
  // console.log(tasklabels.associations);
  console.log("database connected!");
});

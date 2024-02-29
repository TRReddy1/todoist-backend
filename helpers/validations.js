const Joi = require("joi");

//user validation
const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().lowercase(),
  password: Joi.string().required(),
});

//userlogin validation
const loginSchema = Joi.object({
  email: Joi.string().required().lowercase(),
  password: Joi.string().required(),
});

//project validation
const projectSchema = Joi.object({
  name: Joi.string().required(),
  is_favorite: Joi.boolean().optional(),
});

//task validation
const taskSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
});

//comments validation
const commentSchema = Joi.object({
  content: Joi.string().required(),
});

//label validation
const labelSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  userSchema,
  loginSchema,
  projectSchema,
  taskSchema,
  commentSchema,
  labelSchema,
};

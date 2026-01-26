const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    fName: Joi.string().min(2).max(50).required(),
    lName: Joi.string().min(2).max(50).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

const resetValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
  });
  return schema.validate(data);
};

const updateProfileValidation = (data) => {
  const schema = Joi.object({
    fName: Joi.string().min(2).max(50).required(),
    lName: Joi.string().min(2).max(50).required(),
  });
  return schema.validate(data);
};

const changePasswordValidation = (data) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(6).max(255).required(),
    newPassword: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

const resetPasswordValidation = (data) => {
  const schema = Joi.object({
    newPassword: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

// calendar
const addCalendarValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
  });
  return schema.validate(data);
};

// task
const addTaskValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    calendar: Joi.string().required(),
    priority: Joi.string().valid("low", "medium", "high").required(),
    progress: Joi.string()
      .valid("not started", "in progress", "completed")
      .required(),
    date: Joi.date().required(),
    cycle: Joi.boolean(),
    cycleInterval: Joi.number().min(0),
    location: Joi.string().allow(""),
    notes: Joi.string().allow(""),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  resetValidation,
  updateProfileValidation,
  changePasswordValidation,
  resetPasswordValidation,
  addCalendarValidation,
  addTaskValidation,
};

const Joi = require("joi");

// Register Validation

const registerValidation = (reqBody) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(24).required(),

    password: Joi.string().min(6).max(32).required(),

    email: Joi.string().email({ minDomainSegments: 2 }).required(),
  });
  return schema.validate(reqBody);
};

const loginValidation = (reqBody) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).max(254).required(),

    password: Joi.string().min(6).max(32).required(),
  });
  return schema.validate(reqBody);
};

const createRoomValidation = (reqBody) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(32).required(),

    password: Joi.string().min(6).max(32).required(),
  });
  return schema.validate(reqBody);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.createRoomValidation = createRoomValidation;

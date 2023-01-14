const Joi = require("joi");

const validateUser = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  address: Joi.string().alphanum().min(3).max(50),
  age: Joi.number().min(18).max(65).required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
module.exports = { validateUser };

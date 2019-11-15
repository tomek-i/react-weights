const Joi = require('joi');
const mongoose = require('mongoose');

const minStrLength = 4;
const maxStrLength = 25;

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: minStrLength,
      maxlength: maxStrLength
    },
    username: {
      type: String,
      required: true,
      minlength: minStrLength,
      maxlength: maxStrLength,
      lowercase: true
    },
    //TODO: encrypt password, custom set?!
    password: {
      type: String,
      required: true,
      minlength: minStrLength,
      maxlength: maxStrLength
    },
    email: {
      type: String,
      required: true,
      maxlength: maxStrLength * 2
    },
    isActive: { type: Boolean, default: true }
  })
);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(minStrLength)
      .max(maxStrLength)
      .required(),
    username: Joi.string()
      .min(minStrLength)
      .max(maxStrLength)
      .required()
      .lowercase(),
    password: Joi.string()
      .min(minStrLength)
      .max(maxStrLength)
      .required(),
    email: Joi.string()
      .min(minStrLength)
      .max(maxStrLength * 2)
      .required()
      .email(),
    isActive: Joi.boolean()
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;

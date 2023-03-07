require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 25,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 16,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, email: this.email },
    process.env.ACCESS_TOKEN_SECRET
  );

  return token;
};

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(25),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(16).required(),
  });

  return schema.validate(user);
};

module.exports.User = User;
module.exports.validate = validateUser;

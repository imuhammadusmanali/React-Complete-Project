const { User } = require('../models/userModel');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const payload = req.body;
  const { error } = validate(payload);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let user = await User.findOne({ email: payload.email });
  if (!user)
    return res.status(400).json({ message: 'Invalid Email or Password' });

  try {
    const validatePass = await bcrypt.compare(payload.password, user.password);
    if (!validatePass)
      return res.status(400).json({ message: 'Invalid Email or Password' });
  } catch (err) {
    console.error(`bycrypt compare error: ${err}`);
  }

  const token = user.generateAuthToken();

  res.json({ user: _.pick(user, ['_id', 'name', 'email']), token: token });
});

const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(16).required(),
  });

  return schema.validate(req);
};

module.exports = router;

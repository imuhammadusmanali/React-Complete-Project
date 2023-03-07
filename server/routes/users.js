const { User, validate } = require('../models/userModel');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/authWare');
const express = require('express');
const router = express.Router();

router.get('/:me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('name email');

  res.status(200).json(user);
});

router.post('/', async (req, res) => {
  const payload = req.body;
  const { error } = validate(payload);

  if (error) return res.status(400).json({ message: error.details[0].message });

  let user = await User.findOne({ email: payload.email });
  if (user)
    return res.status(400).json({ message: 'User Already Registered!' });

  user = new User(_.pick(payload, ['name', 'email', 'password']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.json({ user: _.pick(user, ['_id', 'name', 'email']), token: token });
});

module.exports = router;

const { Post } = require('../models/postModel');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

module.exports = router;

const { Post, validate } = require('../models/postModel');
const validateId = require('../middlewares/validateId');
const auth = require('../middlewares/authWare');

const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const posts = await Post.find({ 'postedBy.user._id': req.user._id });
  res.status(200).json(posts);
});

router.get('/:id', [auth, validateId], async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post)
    return res
      .status(404)
      .json({ message: `Post was not found with given ID: ${id}` });

  res.status(200).json(post);
});

router.post('/', auth, async (req, res) => {
  const payload = req.body;
  const { error } = validate(payload);

  if (error) return res.status(400).json({ message: error.details[0].message });

  let post = new Post({
    title: payload.title,
    content: payload.content,
    postedBy: {
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    },
  });
  post = await post.save();

  res.status(200).json(post);
});

router.put('/:id', [auth, validateId], async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const { error } = validate(payload);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      title: payload.title,
      content: payload.content,
      postedOn: Date.now(),
    },
    { new: true }
  );
  if (!updatedPost)
    return res
      .status(404)
      .json({ message: `Post was not found with given ID: ${id}` });

  res.status(200).json(updatedPost);
});

router.delete('/:id', [auth, validateId], async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByIdAndRemove(id);

  if (!post)
    return res
      .status(404)
      .json({ message: `Post was not found with given ID: ${id}` });

  res.status(200).json(post);
});

module.exports = router;

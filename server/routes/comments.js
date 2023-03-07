const { Comment, validate } = require('../models/commentModel');
const validateId = require('../middlewares/validateId');
const auth = require('../middlewares/authWare');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const comments = await Comment.find();
  res.status(200).json(comments);
});

router.post('/:postId', auth, async (req, res) => {
  const { postId } = req.params;
  const payload = req.body;
  const { error } = validate(payload);

  if (error) return res.status(400).json({ message: error.details[0].message });

  let comment = new Comment({
    postId,
    content: payload.content,
    commentedBy: {
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    },
  });

  comment = await comment.save();

  res.status(200).json(comment);
});

router.put('/:id', [auth, validateId], async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const { error } = validate(payload);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const updatedComment = await Comment.findByIdAndUpdate(
    id,
    {
      content: payload.content,
      commentedOn: Date.now(),
    },
    { new: true }
  );
  if (!updatedComment)
    return res
      .status(404)
      .json({ message: `Comment was not found with given ID: ${id}` });

  res.status(200).json(updatedComment);
});

router.delete('/:id', [auth, validateId], async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findByIdAndRemove(id);

  if (!comment)
    return res
      .status(404)
      .json({ message: `Comment was not found with given ID: ${id}` });

  res.status(200).json(comment);
});

module.exports = router;

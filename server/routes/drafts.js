const { Draft, validate } = require('../models/draftModel');
const validateId = require('../middlewares/validateId');
const auth = require('../middlewares/authWare');

const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const drafts = await Draft.find({ 'postedBy.user._id': req.user._id });
  res.status(200).json(drafts);
});

router.get('/:id', [auth, validateId], async (req, res) => {
  const { id } = req.params;

  const draft = await Draft.findById(id);
  if (!draft)
    return res
      .status(404)
      .json({ message: `Draft was not found with given ID: ${id}` });

  res.status(200).json(draft);
});

router.post('/', auth, async (req, res) => {
  const payload = req.body;
  const { error } = validate(payload);

  if (error) return res.status(400).json({ message: error.details[0].message });

  let draft = new Draft({
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
  draft = await draft.save();

  res.status(200).json(draft);
});

router.put('/:id', [auth, validateId], async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const { error } = validate(payload);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const updatedDraft = await Draft.findByIdAndUpdate(
    id,
    {
      title: payload.title,
      content: payload.content,
      postedOn: Date.now(),
    },
    { new: true }
  );
  if (!updatedDraft)
    return res
      .status(404)
      .json({ message: `Draft was not found with given ID: ${id}` });

  res.status(200).json(updatedDraft);
});

router.delete('/:id', [auth, validateId], async (req, res) => {
  const { id } = req.params;

  const draft = await Draft.findByIdAndRemove(id);

  if (!draft)
    return res
      .status(404)
      .json({ message: `Draft was not found with given ID: ${id}` });

  res.status(200).json(draft);
});

module.exports = router;

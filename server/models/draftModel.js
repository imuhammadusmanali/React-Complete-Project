const mongoose = require('mongoose');
const Joi = require('joi');

const draftSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 1,
  },
  content: {
    type: String,
    required: true,
    min: 1,
  },
  postedOn: {
    type: Date,
    default: Date.now(),
  },
  postedBy: {
    user: {
      _id: mongoose.Types.ObjectId,
      name: String,
      email: String,
    },
  },
});

const Draft = mongoose.model('Draft', draftSchema);

const validateDraft = (draft) => {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().min(1).required(),
  });

  return schema.validate(draft);
};

module.exports.Draft = Draft;
module.exports.validate = validateDraft;

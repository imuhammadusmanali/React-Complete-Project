const mongoose = require('mongoose');
const Joi = require('joi');

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  commentedOn: {
    type: Date,
    default: Date.now(),
  },
  commentedBy: {
    user: {
      _id: mongoose.Types.ObjectId,
      name: String,
      email: String,
    },
  },
  content: {
    type: String,
    required: true,
    min: 1,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

const validateComment = (comment) => {
  const schema = Joi.object({
    content: Joi.string().min(1).required(),
  });

  return schema.validate(comment);
};

module.exports.Comment = Comment;
module.exports.validate = validateComment;

const mongoose = require('mongoose');
const Joi = require('joi');

const postSchema = new mongoose.Schema({
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

const Post = mongoose.model('Post', postSchema);

const validatePost = (post) => {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().min(1).required(),
  });

  return schema.validate(post);
};

module.exports.Post = Post;
module.exports.validate = validatePost;

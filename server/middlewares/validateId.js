const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send('Invalid ID');
  }

  next();
};

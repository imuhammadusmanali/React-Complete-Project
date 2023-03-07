const express = require('express');

const home = require('../routes/home');
const posts = require('../routes/posts');
const drafts = require('../routes/drafts');
const comments = require('../routes/comments');
const users = require('../routes/users');
const login = require('../routes/login');
const error = require('../middlewares/errorWare');

module.exports = (app) => {
  app.use(express.json());
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  app.use('/', home);
  app.use('/posts', posts);
  app.use('/drafts', drafts);
  app.use('/comments', comments);
  app.use('/users', users);
  app.use('/login', login);

  app.use(error);
};

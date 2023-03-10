const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  winston.info(`Server Listening on port: ${port}`);
});

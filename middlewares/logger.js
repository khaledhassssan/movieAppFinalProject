// Log every request to log.txt file using middleware
const fs = require('fs');

function logger(req, res, next) {
  const logMessage = `${new Date().toISOString()}: ${req.method} ${req.url}\n`;

  fs.appendFile('log.txt', logMessage, (err) => {
    if (err) {
      console.error(err);
    }
  });

  next();
}

module.exports = logger;
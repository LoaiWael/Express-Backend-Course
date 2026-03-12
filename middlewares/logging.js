const { log } = require("node:console");

module.exports = (req, res, nxt) => {
  log("Logging...");
  nxt();
};

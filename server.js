const mongoose = require("mongoose");
require("dotenv").config();
const { connect } = require("./helpers/database");
const app = require("./app");

connect();

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

module.exports = app;

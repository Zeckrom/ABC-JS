require("dotenv").config();

const databaseHelper = require("../helpers/database");

beforeAll(() => {
  return databaseHelper.connect();
});

beforeEach(() => {
  return databaseHelper.truncate();
});

afterAll(() => {
  console.log("i am here");
  return databaseHelper.disconnect();
});

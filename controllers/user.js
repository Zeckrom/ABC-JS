const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const userController = {
  register: async (req, res) => {
    const {
      body: { name, password },
    } = req;
    const oldUser = await User.findOne({ name });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      password: hashedPassword,
    });

    // Create token
    const token = jwt.sign({ user_id: user._id, name }, process.env.TOKEN_KEY, {
      expiresIn: "24h",
    });

    // return new user
    res.status(201).json({ user, token });
  },

  login: async (req, res) => {
    const {
      body: { name, password },
    } = req;

    // Validate user input
    if (!(name && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ name });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, name },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );

      // user
      res.status(200).json({ user, token });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  },
};

module.exports = userController;

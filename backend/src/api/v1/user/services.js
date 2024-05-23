const express = require("express");
const router = express.Router();
const User = require("../../../schemas/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });

      await user.save();
      res
        .status(201)
        .json({ success: true, message: "User registered successfully" });
    } catch (e) {
      res.status(500).json({ success: false, message: e });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ success: false, message: "No username" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Wrong username/password" });
      }
      const token = jwt.sign(
        { username: user.username, role: user.role, fullname: user.fullname },
        "your-secret-key",
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ success: true, token });
    } catch (e) {
      res.status(500).json({ success: false, message: e });
    }
  },
};

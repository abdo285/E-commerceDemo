const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// User registration
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = new User({ username, email, password, role });
    await user.save();
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ _id: user._id.toString(), role: user.role }, '2323d851378311cd9ad76aaf5cdfda6172072fd7f4ce2e461a20f1e350a70df71aa70c762c13e6e85b0ad79d710c3d7f23e56e95a751b6db4f4f2cfbb1c2da91');
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

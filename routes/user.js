// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login Attempt',email,password);

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = new User({ email, password });

    const savedUser = await newUser.save();
    console.log('user saved to mongo',savedUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

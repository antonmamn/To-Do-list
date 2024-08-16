const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/getallusers', async (req, res) => {

  try {

    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/register', async (req, res) => {

  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(password,salt)
    const user = await User.create({ firstName, lastName, email, password: hashedPassword });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email} });

    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid Credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ userId:user.id,token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
 
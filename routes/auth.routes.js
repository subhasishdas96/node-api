const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  try {
    console.log('Received login request for:', userName);

    const Student = db.students;  // Correct model reference
    const student = await Student.findOne({ where: { userName } });

    if (!student) {
      console.log('Student not found');
      return res.status(400).send('Student not found');
    }

    console.log('Student found:', student.userName);

    const validPass = await bcrypt.compare(password, student.password);
    if (!validPass) {
      console.log('Invalid password');
      return res.status(400).send('Invalid password');
    }

    console.log('Password is valid');

    const token = jwt.sign({ _id: student.id }, 'SECRET_KEY');
    console.log('JWT token generated');

    res.header('auth-token', token).send(token);
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Server Error: ' + err.message);
  }
});

module.exports = router;

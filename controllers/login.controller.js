const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/student.model');
const Student = db.students;

exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Check if student exists
        const student = await Student.findOne({ userName });
        if (!student) {
            return res.status(400).send('Student not found');
        }

        // Validate password
        const validPass = await bcrypt.compare(password, student.password);
        if (!validPass) {
            return res.status(400).send('Invalid password');
        }

        // Generate JWT token
        const token = jwt.sign({ _id: student._id }, 'SECRET_KEY');
        res.header('auth-token', token).send(token);
     } catch (err) {
        console.error('Error in login controller:', err);
        res.status(500).send('Server Error: ' + err.message); // Return detailed error message
    }
    
};
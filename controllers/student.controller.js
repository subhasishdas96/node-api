const db = require('../models');
const bcrypt = require('bcryptjs');
const Student = db.students;

exports.getAllStudents = (req, res) => {
  Student.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving students."
      });
    });
};

exports.getStudentById = (req, res) => {
  const id = req.params.id;
  Student.findByPk(id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving Student with id=" + id
      });
    });
};

exports.createStudent = async (req, res) => {
  const { userName, age, grade, password } = req.body;

  // Basic validation
  if (!userName || !age || !grade || !password) {
    return res.status(400).send({
      message: "All fields (userName, age, grade, password) are required."
    });
  }

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 8);

    const student = {
      userName,
      age,
      grade,
      password: hashedPassword
    };

    const data = await Student.create(student);
    res.json(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Student."
    });
  }
};

exports.updateStudent = (req, res) => {
  const id = req.params.id;
  Student.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Student was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error updating Student with id=" + id
      });
    });
};

exports.deleteStudent = (req, res) => {
  const id = req.params.id;
  Student.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Student was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Could not delete Student with id=" + id
      });
    });
};

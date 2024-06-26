const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');
const StudentModel = require('./student.model');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: console.log,  // Enable query logging for debugging
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.students = StudentModel(sequelize, DataTypes);

module.exports = db;

const { Sequelize, DataTypes } = require('sequelize');
const mongoose = require('mongoose');
require('dotenv').config();
const sequelize = new Sequelize(process.env.MYSQL_URL);
const Student = sequelize.define('Student', {
  id: { type: DataTypes.STRING, primaryKey: true },
  name: { type: DataTypes.STRING },
  age: { type: DataTypes.INTEGER },
});
const Course = sequelize.define('Course', {
  id: { type: DataTypes.STRING, primaryKey: true },
  name: { type: DataTypes.STRING },
  credits: { type: DataTypes.INTEGER },
});
const Enrollment = sequelize.define('Enrollment', {
  studentId: { type: DataTypes.STRING, primaryKey: true },
  courseId: { type: DataTypes.STRING, primaryKey: true },
});
const StudentSchema = new mongoose.Schema({ id: String, name: String, age: Number }, { _id: false });
const CourseSchema = new mongoose.Schema({ id: String, name: String, credits: Number }, { _id: false });
const EnrollmentSchema = new mongoose.Schema({ studentId: String, courseId: String }, { _id: false });
const MongoStudent = mongoose.model('Student', StudentSchema);
const MongoCourse = mongoose.model('Course', CourseSchema);
const MongoEnrollment = mongoose.model('Enrollment', EnrollmentSchema);
async function initMySQL() {
  await sequelize.sync({ force: true });
}
async function initMongo() {
  await mongoose.connect(process.env.MONGO_URL);
}
module.exports = { Student, Course, Enrollment, MongoStudent, MongoCourse, MongoEnrollment, initMySQL, initMongo };
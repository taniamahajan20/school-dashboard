"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = __importDefault(require("sequelize"));
//const Sequelize = require('sequelize');
var db = new sequelize_1.default('Coursedb', 'course', 'courset', {
    dialect: 'sqlite',
    storage: './coursedb.db'
});
var Course = db.define('courses', {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Course = Course;
var Batch = db.define('batches', {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    startDate: {
        type: sequelize_1.default.DATE,
    },
    endDate: {
        type: sequelize_1.default.DATE
    }
});
exports.Batch = Batch;
var Teacher = db.define('teachers', {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Teacher = Teacher;
var Student = db.define('students', {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Student = Student;
var Lecture = db.define('lectures', {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Lecture = Lecture;
var Subject = db.define('subjects', {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Subject = Subject;
var StudentBatch = db.define('students_batches', {
    studentBatchId: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});
exports.StudentBatch = StudentBatch;
Batch.belongsTo(Course);
Subject.belongsTo(Course);
Teacher.belongsTo(Subject);
Lecture.belongsTo(Batch);
Lecture.belongsTo(Teacher);
Student.belongsToMany(Batch, { through: StudentBatch });
Batch.belongsToMany(Student, { through: StudentBatch });
//Batch.drop();
//Lecture.drop()
db.sync()
    .then(function () { return console.log("Database has been created"); })
    .catch(function (err) { return console.log("Error creating database"); });

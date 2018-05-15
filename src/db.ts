import  Sequelize  from 'sequelize';
//const Sequelize = require('sequelize');

const db = new Sequelize('Coursedb','course','courset',{
    dialect:'sqlite',
    storage:'./coursedb.db'
})

const Course= db.define('courses',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

const Batch = db.define('batches',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    startDate:{
        type:Sequelize.DATE,
    },
    endDate:{
        type:Sequelize.DATE
    }
})

const Teacher = db.define('teachers',{
  name:{
      type:Sequelize.STRING,
      allowNull:false
  }  
})

const Student = db.define('students',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

const Lecture = db.define('lectures',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

const Subject = db.define('subjects',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

const StudentBatch = db.define('students_batches',{
    studentBatchId:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }
})

Batch.belongsTo(Course);
Subject.belongsTo(Course);
Teacher.belongsTo(Subject);
Lecture.belongsTo(Batch);
Lecture.belongsTo(Teacher);
Student.belongsToMany(Batch,{through: StudentBatch});
Batch.belongsToMany(Student,{through:StudentBatch});

//Batch.drop();
//Lecture.drop()
db.sync()
    .then(()=>console.log("Database has been created"))
    .catch((err)=>console.log("Error creating database"))

export {
    Course,  Batch,  Teacher,  Student,  Lecture,  Subject,StudentBatch
}
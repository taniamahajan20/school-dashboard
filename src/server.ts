import express from'express';
import path from 'path';

const app =express();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))

app.use('/',express.static(path.join(__dirname,'local-management-front/dist')));

app.use('/courses',require('./routes/api/courses').route);
app.use('/teachers',require('./routes/api/teachers').route);
app.use('/students',require('./routes/api/students').route);
app.use('/subjects',require('./routes/api/subjects').route);
app.use('/batches',require('./routes/api/batches').route);

app.listen(2678,()=>{
    console.log("Server started at http://localhost:2678")
});
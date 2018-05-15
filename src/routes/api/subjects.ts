import express from 'express';
import { Subject,Teacher } from '../../db';
const route=express.Router();
route.get('/',(req,res)=>{
    Subject.findAll()
    .then((subjects)=>{
        res.status(200).send(subjects)
    })
    .catch((err)=>{
        res.send({
            error:"Cannot retrieve subjects"
        })
    })
})

route.post('/', (req, res) => {
    Subject.create({
        name: req.body.name,
        courseId:req.body.courseId
    })
        .then((subject) => {
            res.status(201).send(subject)

        })
        .catch((err) => {
            res.status(500).send({
                error: "Cannot add the subject"
            })
        })
})

route.get('/:id',(req,res)=>{
    Subject.find({where:{id:req.params.id}})
    .then((subject)=>res.send(subject))
    .catch((err)=>{
        res.send({
            error:"cannot find the subject"
        })
    })
})

route.delete('/:id',(req,res)=>{
    Subject.destroy({where:{id:req.params.id}})
    .then(()=>{
        res.sendStatus(200)
    })
    .catch((err)=>{
        res.send({
            error:"the subject cannot be deleted"
        })
    })
})

route.get('/:id/teachers',(req,res)=>{
    Teacher.findAll({
        where:{subjectId:req.params.id}
    })
    .then((teachers)=>{
        res.status(200).send(teachers);
    })
    .catch((err)=>{
        res.send("cannot retrieve the teachers")
    })
})
export {route};
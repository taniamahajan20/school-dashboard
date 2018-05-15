import express from 'express';
import { Batch,Teacher,Lecture } from '../../db';
 const route = express.Router()

route.get('/',(req,res)=>{
    Teacher.findAll()
    .then((teachers)=>{
        res.status(200).send(teachers)
    })
    .catch((err)=>{
        res.status(500).send({
            error:"Cannot rerieve the teachers"
        })
    })
})

route.post('/',(req,res)=>{
    Teacher.create({
        name:req.body.name,
        subjectId:req.body.subjectId
    })
    .then((teacher)=>{
        res.status(201).send(teacher)
    })
    .catch((err)=>{
        res.send({
            error:"cannot add the teacher"
        })
    })
})

route.get('/:id',(req,res)=>{
    Teacher.find({
        where:{id:req.params.id}
    })
    .then((teacher)=>{
        res.status(200).send(teacher)
    })
    .catch((err)=>{
        res.send({
            error:"Cannit get the teacher"
        })
    })
})

route.delete('/:id',(req,res)=>{
    Teacher.destroy({
        where:{id:req.params.id}
    })
    .then((teacher)=>{
        res.sendStatus(200)
    })
    .catch((err)=>{
        res.send({
            error:"Cannit delete the teacher"
        })
    })
})

route.get('/:id/batches',(req,res)=>{
    Lecture.findAll(
        {
            attributes:['batchId'],
            raw:false,
             where: { teacherId: req.params.id } 
        }
        )
        .then((batchIds:any) => {
           //res.send(studentIds)
            var ids = [];
            for (var i = 0, max = batchIds.length; i < max; i += 1) {

                ids.push(batchIds[i].batchId);

            }

            Batch.findAll({
                where:{id:ids}
            })
            .then((batches)=>{
                res.send(batches)
            })

        })
        .catch((err)=>{
            res.send({
                error:"cannot retrieve the Batches"
            })
        })
})
export {route};
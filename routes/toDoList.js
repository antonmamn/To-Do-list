const express = require('express');
const router = express.Router();
const {Todo} = require('../models')

router.post('/todo', async (req, res)=>{
    try{
    const{title,description,userId}=req.body

        const todo= Todo.create({title,description,status:'todo',userId})
        res.json(todo)

    }catch (error){
        res.status(500).json({ error: error.message });
    }
})



router.get('/todo', async (req, res) => {
    try {

        const { userId } = req.query;

        const todos = await Todo.findAll({ where: { userId } });

        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/todo/:id',async (req,res)=>{

    try {

        const rows = await Todo.update(
            { status: req.body.status },
            { where: { id: req.params.id } }
        );

        res.json(rows)

    }catch (error){
        res.status(500).json({ error: error.message });
    }
})

router.delete('/todo/:id',async (req,res)=>{

    try {
        const rows = await Todo.destroy(
            { where: { id: req.params.id } }
        );

        res.json(rows)

    }catch (error){
        res.status(500).json({ error: error.message });
    }
})




module.exports=router
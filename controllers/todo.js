const router = require('express').Router();
const { sequelize, DataTypes } = require('../config/database');
const Todos = require('../models/todos')(sequelize, DataTypes);

router.get('/get-todo', async(req, res)=> {
    try{
        const getItem = await Todos.findAll();
        res.status(200).json(getItem);
    }catch(e){
        res.status(res.statusCode).json(e);
    }
});

router.get('/get-todo-byid', async(req, res) => {
    try{
        const findItem = await Todos.findOne({
            where:{
                id: req.query.id
            }
        });
        res.status(200).json(findItem);
    }catch(e){
        res.status(req.statusCode).json(e);
    }
});

router.post('/add-todo', async(req, res) => {
    try{
        const addTodo = await Todos.create({
            title: req.body.title,
            desc: req.body.desc,
            status: req.body.status,
        });

        res.status(200).json(addTodo.id);
    }catch(e){
        res.status(res.statusCode).json(e);
    }
});

router.delete('/delete-todo', async(req, res) => {
    try{
        const deleteItem = await Todos.destroy({
            where:{
                id: req.query.id
            }
        });
        res.status(200).json(deleteItem);
    }catch(e){
        res.status(res.statusCode).json(e);
    }
});

router.put('/update-todo', async(req, res) => {
    try{
        const findItem = await Todos.findOne({where:{id: req.body.id}});
        if(!findItem){
            res.status(404).json(`not have a item`);
            return;
        }; 

        findItem.title = req.body.title;
        findItem.desc = req.body.desc;
        findItem.status = req.body.status;
        const updateItem = await Todos.update(
            findItem.dataValues, { where: { id: findItem.id } }
        );
        res.status(200).json(updateItem[0]);

    }catch(e){
        res.status(res.statusCode).json(e);
    }
});


module.exports =router; 
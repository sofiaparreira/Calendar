const express = require('express')
const Task = require('../models/Task')

const router = express.Router()


//mostrar itens no calendário
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll()
        res.status(200).json(tasks)
    } catch (error) {
        console.error("Error Get: ", error)
        res.status(400).json({error: "Error Get"})
    }
})


router.get("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;    

        const task = await Task.findOne({
            where: { id: taskId },
        });

        if (!task) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error("Error fetching product", error);
        res.status(500).json({ error: "Erro ao buscar produto" });
    }
});


router.post('/add', async (req, res) => {
    console.log("Request Body:", req.body); 
    const { id, title, description, date, category, employee } = req.body;

    try {
        if (!title) {
            return res.status(400).json({ error: "Title is empty" });
        }

        const newTask = await Task.create({
            id,
            title,
            description,
            date,
            category,
            employee,
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error Post: ", error);
        res.status(400).json({ error: "Error Post" });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.destroy({ where: { id } });

        if(!task){
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted sucessfully" });

        
    } catch (error) {
        console.error("Error deleting task", error);
        return res.status(500).json({error: "Error deleting task"})
    }
})

router.put("/update/:id", async (req, res) => {

    try {
        const { id } = req.params 
        const { title, description, date, category, employee } = req.body;

        const task = await Task.findByPk(id)
        if(!task){
            return res.status(404).json({error: "Task not found"})
        }

        await Task.update(
            { title, description, date, category, employee },
            { where: { id } }
        )

        res.status(200).json({message: "Product updated successfully"})

    } catch (error) {
        console.error("Error updating task", error)
        return res.status(500).json({error: "Error updating task"})
    }
})



module.exports = router
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




router.post('/add', async (req, res) => {
    console.log("Request Body:", req.body); // Verifica o que está sendo enviado
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



module.exports = router
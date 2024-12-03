const express = require('express')
const cors = require('cors')
const taskRoutes = require('./routes/taskRoutes')

const app = express()
app.use(cors())
app.use(express.json());

app.use(taskRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on the port ${PORT}`))
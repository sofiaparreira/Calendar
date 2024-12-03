const sequelize = require("./config/database")
const Task = require("./models/Task")

sequelize.sync({force: true}).then(() => {
    console.log('Synced database')
}).catch((error) => {
    console.error('Erro ao sincronizar database', error)
})
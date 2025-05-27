const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const path = require('path');

const app = express();

// Configurar middlewares
app.use(cors());
app.use(express.json());

// Configurar as rotas da API
app.use(taskRoutes);

// Serve os arquivos estáticos do React build
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Rota coringa para o React SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

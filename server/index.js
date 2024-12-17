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

// Servir os arquivos estáticos do React
app.use(express.static(path.join(__dirname, 'build')));

// Rota padrão para servir o React (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configurar a porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

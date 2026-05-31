const express = require('express');

const app = express();

app.use(express.json());

const heroesRoutes = require('./routes/heroes');

app.use('/heroes', heroesRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
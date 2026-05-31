const express = require('express');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    return res.sendStatus(200);
  }
  next();
});

const heroesRoutes = require('./routes/heroes');

app.use('/heroes', heroesRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
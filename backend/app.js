const express = require('express');
const heroesRoutes = require('./routes/heroes');

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

app.use('/heroes', heroesRoutes);

module.exports = app;

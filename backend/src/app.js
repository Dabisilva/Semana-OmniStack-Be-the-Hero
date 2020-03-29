const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes'); /*nesse caso o "./" serve para indicar que é um arquivo que esta na mesma pasta
 e não um pacote*/

const app = express();

app.use(cors());
app.use(express.json()); //é importante isso vim antes das rotas para informar que esta em formato json
app.use(routes);
app.use(errors());

module.exports = app;
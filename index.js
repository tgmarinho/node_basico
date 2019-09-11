const express = require("express");

process.PORT = 3333;
const server = express();

/**
 * três tipos de parametros
 * Query params = ?teste=1
 * Route params = /users/1
 * Request Body = { "name": "Thiago" }
 */

const users = ["Thiago", "Delacyr", "Filipe", "Pedro"];

// Route params = /users/1
// fazer a requisição no navegador: http://localhost:3333/users/1
server.get("/users/:index", (req, res) => {
  const { index } = req.params; // desestruturando com ES06
  return res.json(users[index]);
});

server.listen(process.PORT, () => {
  console.log("executando o express na porta: " + process.PORT);
});

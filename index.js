const express = require("express");

process.PORT = 3333;
const server = express();

/**
 * três tipos de parametros
 * Query params = ?teste=1
 * Route params = /users/1
 * Request Body = { "name": "Thiago" }
 */

// Query params = ?teste=1
// fazer a requisição no navegador: http://localhost:3333/teste/?nome=Thiago
server.get("/teste", (req, res) => {
  const nome = req.query.nome;
  return res.json({ message: `Hello ${nome}` });
});

// Route params = /users/1
// fazer a requisição no navegador: http://localhost:3333/users/1
server.get("/users/:id", (req, res) => {
  // const id = req.params.id;
  const { id } = req.params; // desestruturando com ES06
  return res.json({ message: `Buscando o usuário de ID: ${id}` });
});

// Inicia o servidor ouvindo a porta 3333
server.listen(process.PORT, () => {
  console.log("executando o express na porta: " + process.PORT);
});

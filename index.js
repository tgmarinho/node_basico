const express = require("express");

process.PORT = 3333;
const server = express();

server.use(express.json());

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

// Listar todos usuários
server.get("/users", (req, res) => {
  return res.json(users);
});

// Criar usuário
server.post("/users", (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

// Editar/Atualizar usuário
server.put("/users/:index", (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;
  return res.json(users);
});

server.delete("/users/:index", (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.json({ message: "Deletado com sucesso" });
});

server.listen(process.PORT, () => {
  console.log("executando o express na porta: " + process.PORT);
});

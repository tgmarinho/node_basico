const express = require("express");

process.PORT = 3333;
const server = express();

server.use(express.json());

const users = ["Thiago", "Delacyr", "Filipe", "Pedro"];

// Middleware global
server.use((req, res, next) => {
  console.time("A requisição foi chamada");
  next();
});

server.use((req, res, next) => {
  console.time("REQUEST");
  console.log(`Método: ${req.method} 
               na URL: ${req.url} `);
  next();
  console.timeEnd("REQUEST");
});

// Middleware Local específico
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "Name is required!" });
  }

  return next();
}

// Middleware Local específico
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "User does not exists!" });
  }

  req.user = user;

  return next();
}

// Lista usuário de index = ao que foi passado na rota
server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

// Listar todos usuários
server.get("/users", (req, res) => {
  return res.json(users);
});

// Criar usuário
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

// Editar/Atualizar usuário
server.put("/users/:index", checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;
  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.json({ message: "Deletado com sucesso" });
});

server.listen(process.PORT, () => {
  console.log("executando o express na porta: " + process.PORT);
});

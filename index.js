// importo o módulo do express
const express = require("express");
// declaro uma porta para o servidor ouvir as requisições
process.PORT = 3333;
// inicio o servidor express
const server = express();
// declaro uma rota test que recebe uma requisição get e retorna um json com uma mensagem
// abrir o navegador e acessar: http://localhost:3333:/test e vc vai ver a mensagem.
server.get("/test", (req, res) => {
  return res.json({ message: "Oi, eu sou um App feito com Node e Express!" });
});
// Inicia o servidor ouvindo a porta 3333
server.listen(process.PORT, () => {
  console.log("executando o express na porta: " + process.PORT);
});

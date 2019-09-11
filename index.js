const express = require("express");
process.PORT = 3333;

const server = express();

server.use(express.json());

const projects = [];
let countRequest = 0;

function checkExistsProject(req, res, next) {
  const id = req.body.id;
  if (projects.some(project => project.id == id)) {
    return res.status(400).json({ error: "Project already exist!" });
  }

  return next();
}

function logCountRequest(req, res, next) {
  countRequest = countRequest + 1;
  console.log(`${countRequest} requests were made to the server`);
  next();
}

function projectValidate(req, res, next) {
  const { id, title } = req.body;
  if (!id || !title) {
    return res.status(400).json({ error: "ID and Title is required!" });
  }
  return next();
}

server.post(
  "/projects",
  logCountRequest,
  projectValidate,
  checkExistsProject,
  (req, res) => {
    const { id, title, tasks } = req.body;
    projects.push({ id, title, tasks });
    return res.json(projects);
  }
);

server.get("/projects", logCountRequest, (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", logCountRequest, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id == id);
  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", logCountRequest, (req, res) => {
  const { id } = req.params;
  const projectIdx = projects.findIndex(project => project.id == id);
  projects.splice(projectIdx, 1);
  return res.send({ message: "Deletado com sucesso" });
});

server.post("/projects/:id/tasks", logCountRequest, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id == id);
  console.log(project);
  project.tasks.push(title);
  return res.json(project.tasks);
});

server.listen(process.PORT, () => {
  console.log(`executando o servidor na ${process.PORT}`);
});

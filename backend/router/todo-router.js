const Router = require("express").Router();
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodosById,
} = require("../controller/todo-controller");

Router.get("/todos", getAllTodos);
Router.get("/todos/:id", getTodosById);
Router.post("/todos", createTodo);
Router.put("/todos/:id", updateTodo);
Router.delete("/todos/:id", deleteTodo);

module.exports = Router;

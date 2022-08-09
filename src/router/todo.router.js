// Built in Imports
const express = require("express");
const TodoRouter = express.Router();

const TodoController = require("../controller/todo.controller");
const Validator = require("../middleware/validator.middleware");

//  Routes (/todo)

TodoRouter.get("/", Validator.isLoggedin, TodoController.allTodos);
TodoRouter.post("/new", Validator.isLoggedin, TodoController.create);

module.exports = TodoRouter;

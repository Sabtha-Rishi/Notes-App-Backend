const TodoModel = require("../model/todo.model");
const jwt = require("jsonwebtoken");

// New Todo
const create = (req, res) => {
  const userID = jwt.verify(req.cookies.token, JWT_SECRET).id;

  let newTodo = new TodoModel(req.body);
  newTodo.userID = userID;

  newTodo.save((err, todo) => {
    if (err) {
      return res.json({
        success: false,
        err: err.message,
      });
    }

    return res.json({
      success: true,
      todo: todo,
    });
  });
};

// All User Todos

const allTodos = (req, res) => {
  const userID = jwt.verify(req.cookies.token, JWT_SECRET).id;

  TodoModel.find({ userID: userID }, (err, todos) => {
    if (err) {
      return res.json({
        success: false,
        err: err.message,
      });
    }
    return res.json({
      success: true,
      todos: todos,
    });
  });
};

const TodoController = {
  create,
  allTodos,
};

module.exports = TodoController;

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

// Update Todo
const update = (req, res) => {
  const todoID = req.params.todoID;
  TodoModel.findByIdAndUpdate(todoID, req.body, { new: true }, (err, todo) => {
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

// Single Todo

const singleTodo = (req, res) => {
  const todoID = req.params.todoID;
  TodoModel.findById(todoID, (err, todo) => {
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

// Delete Todo
const deleteTodo = (req, res) => {
  const todoID = req.params.todoID;
  TodoModel.deleteOne({ _id: todoID }, (err) => {
    if (err) {
      return res.json({
        success: false,
        err: err.message,
      });
    }
    return res.json({
      success: true,
    });
  });
};

const TodoController = {
  create,
  allTodos,
  update,
  singleTodo,
  deleteTodo,
};

module.exports = TodoController;

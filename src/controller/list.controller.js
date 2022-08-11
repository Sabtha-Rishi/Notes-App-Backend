const ListModel = require("../model/list.model");
const TodoModel = require("../model/todo.model");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "sKSDwsbdkJH&@#&297298ydkjhsdfqw83yr2893y(*YWuerh238ry0(U&)(09q3r209fwkjhfehJH}{}WJe38rywehfj))";


// Create List

const create = (req, res) => {
  const userID = jwt.verify(req.cookies.token, JWT_SECRET).id;

  let newList = new ListModel(req.body);
  newList.userID = userID;

  newList.save((err, list) => {
    if (err) {
      return res.json({
        success: false,
        err: err.message,
      });
    }
    return res.json({
      success: true,
      list: list,
    });
  });
};

// Add todo to list
const addToList = (req, res) => {
  const userID = jwt.verify(req.cookies.token, JWT_SECRET).id;

  let newTodo = new TodoModel();
  newTodo.task = req.body.task;
  newTodo.userID = userID;
  newTodo.isHidden = true;

  newTodo.save((err, todo) => {
    if (err) {
      return res.json({
        success: false,
        err: err.message,
      });
    }

    // Todo Created

    ListModel.findByIdAndUpdate(
      req.body.listID,
      { $push: { todos: todo._id } },
      { new: true },
      (err, list) => {
        if (err) {
          return res.json({
            success: false,
            err: err.message,
          });
        }

        // Todo added to the list
        return res.json({
          success: true,
          list: list,
        });
      }
    );
  });
};

const allLists = (req, res) => {
  const userID = jwt.verify(req.cookies.token, JWT_SECRET).id;
  ListModel.find({ userID: userID }, (err, lists) => {
    if (err) {
      return res.json({
        success: false,
        err: err.message,
      });
    }
    return res.json({
      success: true,
      lists: lists,
    });
  });
};

const getList = (req, res) => {
  const userID = jwt.verify(req.cookies.token, JWT_SECRET).id;

  ListModel.findById(req.params.listID, (err, list) => {
    if (err) {
      return res.json({
        success: false,
        err: err.message,
      });
    }
    if (list.userID != userID) {
      return res.json({
        success: false,
        err: "Not authenticated",
      });
    }

    TodoModel.find()
      .where("_id")
      .in(list.todos)
      .exec((err, todosData) => {
        return res.status(201).json({
          success: true,
          list: list,
          todos: todosData,
        });
      });
  });
};

const update = (req, res) => {
  const listID = req.params.listID;
  ListModel.findByIdAndUpdate(listID, req.body, { new: true }, (err, list) => {
    if (err) {
      return res.json({
        success: false,
        err: err.message,
      });
    }
    return res.json({
      success: true,
      list: list,
    });
  });
};

const ListController = {
  create,
  addToList,
  allLists,
  getList,
  update,
};
module.exports = ListController;

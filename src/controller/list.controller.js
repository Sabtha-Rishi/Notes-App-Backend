const ListModel = require("../model/list.model");
const TodoModel = require("../model/todo.model");
const AccountsModel = require("../model/accounts.model");
const jwt = require("jsonwebtoken");

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

const ListController = {
  create,
};
module.exports = ListController;

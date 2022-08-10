// Built in Imports
const express = require("express");
const ListRouter = express.Router();

const ListController = require("../controller/list.controller");
const Validator = require("../middleware/validator.middleware");

//  Routes (/list)

ListRouter.get("/", Validator.isLoggedin, ListController.allLists);
ListRouter.post("/new", Validator.isLoggedin, ListController.create);
ListRouter.post("/add-todo", Validator.isLoggedin, ListController.addToList);

module.exports = ListRouter;

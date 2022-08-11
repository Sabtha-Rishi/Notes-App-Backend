// Built in Imports
const express = require("express");
const TransactionRouter = express.Router();

const TramsactionController = require("../controller/transaction.controller");
const Validator = require("../middleware/validator.middleware");

//  Routes (/transaction)

TransactionRouter.get("/",Validator.isLoggedin,TramsactionController.allTransactions);
TransactionRouter.post("/new",Validator.isLoggedin,TramsactionController.create);


module.exports = TransactionRouter;

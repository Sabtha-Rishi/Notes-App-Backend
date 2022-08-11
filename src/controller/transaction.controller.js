const TransactionModel = require("../model/transaction.model");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "sKSDwsbdkJH&@#&297298ydkjhsdfqw83yr2893y(*YWuerh238ry0(U&)(09q3r209fwkjhfehJH}{}WJe38rywehfj))";

// Create Transaction
const create = (req, res) => {
  const userID = jwt.verify(req.cookies.token, JWT_SECRET).id;

  let newTransaction = new TransactionModel(req.body);
  newTransaction.userID = userID;

  newTransaction.save((err, transaction) => {
    if (err) {
      return res.json({
        success: false,
        err: err.message,
      });
    }
    return res.json({
      success: true,
      transacion: transaction,
    });
  });
};

// All Transactions

const allTransactions = (req, res) => {
  const userID = jwt.verify(req.cookies.token, JWT_SECRET).id;
  TransactionModel.find({ userID: userID }, (err, transactions) => {
    if (err) {
      return res.json({
        success: false,
        err: err.message,
      });
    }
    return res.json({
      success: true,
      transactions: transactions,
    });
  });
};

const TransactionController = {
  create,
  allTransactions,
};

module.exports = TransactionController;

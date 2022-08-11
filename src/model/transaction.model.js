// IMPORTS
const mongoose = require("mongoose");

// MODEL SCHEMA
const TransactionSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  title: {
    required: true,
    type: String,
  },
  amount: {
    required: true,
    type: Number,
  },
  category: {
    type: String,
    enum: [
      "others",
      "food",
      "medicines",
      "fashion",
      "sport",
      "bills",
      "entertainment",
      "travel",
      "charity",
      "savings",
      "investment",
      "work",
      "groceries",
    ],
    required: true,
    default: "others",
  },
  isPending: {
    type: Boolean,
    required: true,
    default: false,
  },
  isProfit: {
    type: Boolean,
    required: true,
  },
  spent_at: {
    type: Date,
    require: true,
    default: Date.now(),
  },
  isArchieved: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// ______________________________________ SCHEMA END  ____________________________
//  _____________________________________ MODEL METHODS START _____________________

TransactionSchema.methods = {};

//  _____________________________________ MODEL METHODS END ______________________
//  _________________________________________ EXPORTS _____________________________

const Transaction = (module.exports = mongoose.model(
  "Transaction",
  TransactionSchema
));

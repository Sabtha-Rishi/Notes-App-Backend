// IMPORTS
const mongoose = require("mongoose");

// MODEL SCHEMA
const TodoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  isProtected: {
    type: Boolean,
    required: true,
    default: false,
  },
  task: {
    required: true,
    type: String,
  },
  created_at: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

// ______________________________________ SCHEMA END  ____________________________
//  _____________________________________ MODEL METHODS START _____________________

TodoSchema.methods = {};

//  _____________________________________ MODEL METHODS END ______________________
//  _________________________________________ EXPORTS _____________________________

const Todo = (module.exports = mongoose.model("Todo", TodoSchema));

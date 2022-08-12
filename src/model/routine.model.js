// IMPORTS
const mongoose = require("mongoose");

// MODEL SCHEMA
const RoutineSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  name: {
    required: true,
    type: String,
  },
  started_at: {
    type: Date,
    require: true,
    default: Date.now(),
  },
  tasks: [
    {
      type: String,
    },
  ],
  isArchieved: {
    type: Boolean,
    required: true,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  isStarted: {
    type: Boolean,
    required: true,
    default: false,
  },
  isEnded: {
    type: Boolean,
    required: true,
    default: false,
  },
  
});
// ______________________________________ SCHEMA END  ____________________________
//  _____________________________________ MODEL METHODS START _____________________

RoutineSchema.methods = {};

//  _____________________________________ MODEL METHODS END ______________________
//  _________________________________________ EXPORTS _____________________________

const Routine = (module.exports = mongoose.model("Routine", RoutineSchema));

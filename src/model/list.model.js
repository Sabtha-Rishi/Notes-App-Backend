// IMPORTS
const mongoose = require("mongoose");

// MODEL SCHEMA
const ListSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  title: {
    required: true,
    type: String,
  },
  desc: {
    type: String,
    required: true,
    default: "",
    maxLength: 120,
  },
  tasks: [
    {
      type: String,
    },
  ],
  created_at: {
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

ListSchema.methods = {};

//  _____________________________________ MODEL METHODS END ______________________
//  _________________________________________ EXPORTS _____________________________

const List = (module.exports = mongoose.model("List", ListSchema));

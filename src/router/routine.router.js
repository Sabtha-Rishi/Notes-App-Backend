// Built in Imports
const express = require("express");
const RoutineRouter = express.Router();

const RoutineController = require("../controller/routine.controller");
const Validator = require("../middleware/validator.middleware");

//  Routes (/routine)

RoutineRouter.get("/", Validator.isLoggedin, RoutineController.allRoutines);
RoutineRouter.get(
  "/:routineID",
  Validator.isLoggedin,
  RoutineController.getRoutine
);
RoutineRouter.post(
  "/:routineID/update",
  Validator.isLoggedin,
  RoutineController.update
);
RoutineRouter.post(
  "/:routineID/set-default",
  Validator.isLoggedin,
  RoutineController.setDefaultRoutine
);
RoutineRouter.post(
  "/:routineID/reset",
  Validator.isLoggedin,
  RoutineController.reset
);
RoutineRouter.post("/new", Validator.isLoggedin, RoutineController.create);
RoutineRouter.post(
  "/add-todo",
  Validator.isLoggedin,
  RoutineController.addToRoutine
);

module.exports = RoutineRouter;

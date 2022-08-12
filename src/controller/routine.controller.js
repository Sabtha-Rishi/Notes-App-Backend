const RoutineModel = require("../model/routine.model");
const TodoModel = require("../model/todo.model");
const AccountsModel = require("../model/accounts.model");

const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "sKSDwsbdkJH&@#&297298ydkjhsdfqw83yr2893y(*YWuerh238ry0(U&)(09q3r209fwkjhfehJH}{}WJe38rywehfj))";

// Create List

const create = (req, res) => {
  const userID = jwt.verify(req.cookies.token, JWT_SECRET).id;

  let newRoutine = new RoutineModel(req.body);
  newRoutine.userID = userID;

  newRoutine.save((err, routine) => {
    if (err) {
      return res.json({
        success: false,
        err: err.message,
      });
    }
    return res.json({
      success: true,
      routine: routine,
    });
  });
};

// Add todo to list
const addToRoutine = (req, res) => {
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

    RoutineModel.findByIdAndUpdate(
      req.body.routineID,
      { $push: { tasks: todo._id } },
      { new: true },
      (err, routine) => {
        if (err) {
          return res.json({
            success: false,
            err: err.message,
          });
        }

        // Todo added to the Routine
        return res.json({
          success: true,
          routine: routine,
        });
      }
    );
  });
};

const allRoutines = (req, res) => {
  const userID = jwt.verify(req.cookies.token, JWT_SECRET).id;
  RoutineModel.find({ userID: userID }, (err, routines) => {
    if (err) {
      return res.json({
        success: false,
        err: err.message,
      });
    }
    return res.json({
      success: true,
      routines: routines,
    });
  });
};

const getRoutine = (req, res) => {
  const userID = jwt.verify(req.cookies.token, JWT_SECRET).id;

  RoutineModel.findById(req.params.routineID, (err, routine) => {
    if (err) {
      return res.json({
        success: false,
        err: err.message,
      });
    }
    if (routine.userID != userID) {
      return res.json({
        success: false,
        err: "Not authenticated",
      });
    }

    TodoModel.find()
      .where("_id")
      .in(routine.tasks)
      .exec((err, tasksData) => {
        if (err) {
          return res.json({
            success: false,
            err: err.message,
          });
        }
        return res.status(201).json({
          success: true,
          routine: routine,
          tasks: tasksData,
        });
      });
  });
};

const update = (req, res) => {
  const routineID = req.params.routineID;
  RoutineModel.findByIdAndUpdate(
    routineID,
    req.body,
    { new: true },
    (err, routine) => {
      if (err) {
        return res.json({
          success: false,
          err: err.message,
        });
      }
      return res.json({
        success: true,
        routine: routine,
      });
    }
  );
};

const setDefaultRoutine = (req, res) => {
  const routineID = req.params.routineID;

  const userID = jwt.verify(req.cookies.token, JWT_SECRET).id;

  AccountsModel.findByIdAndUpdate(
    userID,
    { defaultRoutine: routineID },
    { new: true },
    (err, user) => {
      if (err) {
        return res.json({
          success: false,
          err: err.message,
        });
      }
      return res.json({
        success: true,
      });
    }
  );
};

const RoutineController = {
  create,
  addToRoutine,
  allRoutines,
  getRoutine,
  update,
  setDefaultRoutine,
};
module.exports = RoutineController;

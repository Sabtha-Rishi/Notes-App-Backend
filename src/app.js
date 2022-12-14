//BUILT IN IMPORTS
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

// ROUTER IMPORTS

const AccountsRouter = require("./router/accounts.router");
const TodoRouter = require("./router/todo.router");
const ListRouter = require("./router/list.router");
const TransactionRouter = require("./router/transaction.router");
const RoutineRouter = require("./router/routine.router");

// EXPRES APP
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  cors({
    origin: req.headers.origin,
    credentials: true,
    exposedHeaders: ["set-cookie"],
  });
  next();
});

// MIDDLEWARES

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("trust proxy", 1);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://admin:Rishi1234.@data.og0iv6q.mongodb.net/DATA?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// ROUTES
app.use("/accounts", AccountsRouter);
app.use("/todo", TodoRouter);
app.use("/list", ListRouter);
app.use("/transaction", TransactionRouter);
app.use("/routine", RoutineRouter);

// EXPORTS
module.exports = app;

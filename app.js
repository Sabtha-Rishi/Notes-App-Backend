//BUILT IN IMPORTS
import express, { json } from "express";
import cookieParser from "cookie-parser";
import { connect } from "mongoose";
import { config } from "dotenv";
import { urlencoded } from "body-parser";
import cors from "cors";

config();

// ROUTER IMPORTS

import AccountsRouter from "./router/accounts.router";
// EXPRES APP
const app = express();

// app.use((req, res, next) => {

//   next();
// });

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

app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("trust proxy", 1);

// Connect to MongoDB
connect(
    "mongodb+srv://admin:Rishi1234.@data.qcgzl.mongodb.net/DATA?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// ROUTES
app.use("/accounts", AccountsRouter);
app.use("/requests", RequestsRouter);

// EXPORTS
export default app;

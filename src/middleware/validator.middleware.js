const jwt = require("jsonwebtoken");
const AccountsModel = require("../model/accounts.model");

JWT_SECRET =
  "sKSDwsbdkJH&@#&297298ydkjhsdfqw83yr2893y(*YWuerh238ry0(U&)(09q3r209fwkjhfehJH}{}WJe38rywehfj))";

const isLoggedin = (req, res, next) => {
  try {
    if (!req.cookies.token) {
      return res.status(201).json({
        isAuthenticated: false,
        err: "Login required",
      });
    }

    const userID = jwt.verify(req.cookies.token, JWT_SECRET).id;
    AccountsModel.findOne({ _id: userID }, function (err, user) {
      if (err) {
        return res.status(201).json({
          isAuthenticated: false,
          err: err.message,
        });
      }
      next();
    });
  } catch {
    res.status(201).json({
      isAuthenticated: false,
      err: "Invalid request!",
    });
  }
};

const ValidatorMiddleware = {
  isLoggedin,
};

module.exports = ValidatorMiddleware;

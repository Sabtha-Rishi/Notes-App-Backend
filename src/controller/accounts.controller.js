const User = require("../model/accounts.model");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

multer = require("multer");
const AccountsModel = require("../model/accounts.model");

JWT_SECRET = JWT_SECRET =
  "sKSDwsbdkJH&@#&297298ydkjhsdfqw83yr2893y(*YWuerh238ry0(U&)(09q3r209fwkjhfehJH}{}WJe38rywehfj))";
// STORAGE
var Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir("./Files/", (err) => {
      cb(null, "./Files/");
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: Storage });

//  Creating new user
const createUser = async (req, res) => {
  console.log(req.body);

  //Image Buffer
  var img = fs.readFileSync(req.file.path);
  var encode_img = img.toString("base64");

  const profilePic = {
    data: new Buffer.from(encode_img, "base64"),
    contentType: req.file.mimetype,
  };

  let newUser = new User(req.body);

  newUser.profilePic = profilePic;

  newUser.setPassword(req.body.password);

  newUser.save((err, User) => {
    if (err) {
      return res.status(400).send({
        error: err.message,
      });
    } else {
      User.save(newUser);
      return res.json({ isSuccess: true });
    }
  });
};

// User Login and Token Generator
const loginUser = (req, res) => {
  // Find user with requested email
  User.findOne({ email: req.body.email }, function (err, user) {
    if (user === null) {
      return res.status(400).send({
        error: "User not found.",
      });
    } else {
      if (user.validPassword(req.body.password)) {
        const token = jwt.sign(
          {
            id: user._id,
          },
          JWT_SECRET
        );

        res.cookie("token", token, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
          // sameSite: "none",
          // secure: true,
        });
        return res.status(201).send({
          isAuthenticated: true,
          csrfok: true,
        });
      } else {
        return res.status(400).send({
          isAuthenticated: false,
        });
      }
    }
  });
};

// User Logout
const logoutUser = (req, res) => {
  res.clearCookie("token");
  return res.json({
    isSuccess: true,
  });
};

//getUser

const getUser = (req, res) => {
  const userID = jwt.verify(req.cookies.token, JWT_SECRET).id;

  AccountsModel.findOne({ _id: userID }, (err, user) => {
    if (err) {
      return res.status(401).json({ err: err.message, isAuthenticated: false });
    }

    if (!user) {
      return res
        .status(401)
        .json({ err: "No user found", isAuthenticated: false });
    }
    return res.status(201).json({ user: user, isAuthenticated: true });
  });
};

// Update User

const updateUser = (req, res) => {
  const userID = jwt.verify(req.cookies.token, JWT_SECRET).id;

  AccountsModel.findByIdAndUpdate(userID, req.body, (err, user) => {
    if (err) {
      return res.status(401).json({ err: err.message, isUpdated: false });
    }

    if (!user) {
      return res.status(401).json({ err: "No user found", isUpdated: false });
    }
    return res.status(201).json({ user: user, isUpdated: true });
  });
};

//Change Password
const changePassword = (req, res) => {
  const userID = jwt.verify(req.cookies.token, JWT_SECRET).id;

  AccountsModel.findOne({ _id: userID }, (err, user) => {
    if (err) {
      return res.send(err.message);
    }

    if (!user) {
      return res.send("No business found");
    }

    if (req.body.oldPassword === req.body.newPassword) {
      return res.send("Old and new password are same");
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.send("Passwords do not match");
    }
    if (!business.validPassword(req.body.oldPassword)) {
      return res.send("OLD password is wrong");
    }

    user.setPassword(req.body.newPassword);
    user.save((err, result) => {
      if (err) {
        return res.send(err.message);
      }
      return res.send(result);
    });
  });
};

//Delete User
const deleteUser = (req, res) => {
  const userID = jwt.verify(req.cookies.token, JWT_SECRET).id;
  AccountsModel.deleteOne({ __id: userID }, (err) => {
    if (err) {
      return res.send(err.message);
    }
    return res.send("User Deleted");
  });
};

// Single User

const getSingleUser = (req, res) => {
  AccountsModel.findById(req.params.userId, (err, user) => {
    if (err) {
      return res.json({
        isSuccess: false,
        errr: err.message,
      });
    }
    return res.json({
      isSuccess: true,
      user: user,
    });
  });
};

const AccountsController = {
  createUser,
  upload,
  loginUser,
  logoutUser,
  deleteUser,
  getUser,
  updateUser,
  changePassword,
  getSingleUser,
};

module.exports = AccountsController;

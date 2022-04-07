const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.User;
const RoleType = db.RoleType;

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  console.log("User ID====="+req.userId);

  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if(user==null){
      res.status(403).send({ message: "Invalid Token, please generate token again!" });
      return;
    }
    RoleType.findOne(
      {
        _id: user.role
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      
        if (role.name.toLowerCase() == "admin") {
          next();
          return;
        }
        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};


isAthlete = (req, res, next) => {
  console.log("User ID====="+req.userId);

  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if(user==null){
      res.status(403).send({ message: "Invalid Token, please generate token again!" });
      return;
    }
    RoleType.findOne(
      {
        _id: user.role
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      
        if (role.name.toLowerCase() == "athlete") {
          next();
          return;
        }
        res.status(403).send({ message: "Require Athlete Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isAthlete
};
module.exports = authJwt;
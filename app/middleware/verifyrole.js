
const db = require("../models");
const RoleType=db.RoleType;

checkRoleExists = (req, res, next) => {
    // Username
    RoleType.findOne({
      name: req.body.name
    }).exec((err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (role) {
        res.status(400).send({ message: "Failed! role already exist!" });
        return;
      }
      next();
    });
  };
  module.exports = checkRoleExists;
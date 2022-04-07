
const db = require("../models");
const SportsType = db.SportsType;

checkSportsExists = (req, res, next) => {
    // Username
    SportsType.findOne({
      name: req.body.name,
      active:true
    }).exec((err, sports) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (sports) {
        res.status(400).send({ message: "Failed! Sports already exist!" });
        return;
      }
      next();
    });
  };

  const checkDuplicates = {
    checkSportsExists
  };
  module.exports = checkDuplicates;
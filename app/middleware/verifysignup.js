const db = require("../models");
const ROLES = db.ROLES;
const User = db.User;
const RoleType = db.RoleType;


checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    if(req.body.username==null || req.body.username==''){
      res.status(400).send({ message: "Failed! Username cannot be empty!" });
      return;
    }
    
    if(req.body.email==null || req.body.email==''){
      res.status(400).send({ message: "Failed! Email cannot be empty!" });
      return;
    }

    User.findOne({
      username: req.body.username
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (user) {
        res.status(400).send({ message: "Failed! Username is already in use!" });
        return;
      }
  
      // Email
      User.findOne({
        email: req.body.email
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (user) {
          res.status(400).send({ message: "Failed! Email is already in use!" });
          return;
        }
  
        next();
      });
    });
  };


  checkRolesExisted = (req, res, next) => {
    try{
      if (req.body.role_id) {
        RoleType.findOne({
          _id: req.body.role_id
        }).exec((err, role) => {
          if (err) {
            res.status(400).send({  message: `Something is wrong with role!` });
            return;
          }
          if (!role) {
            res.status(400).send({ message: "Invalid role" });
            return;
          }
        });
      }
      else{
        res.status(400).send({
          message: `Please assign a role to user!`
        });
        return;
      }
      next();
    }
    catch(error){
      res.status(400).send({
        message: `Something is wrong with role!`
      });
      return;
    }
  };

  // checkRolesExisted = (req, res, next) => {
  //   if (req.body.roles) {
  //     for (let i = 0; i < req.body.roles.length; i++) {
  //       Role.findOne({
  //         name: req.body.roles[i]
  //       }).exec((err, role) => {
  //         if (err) {
  //           res.status(500).send({ message: err });
  //           return;
  //         }
      
  //         if (role) {
  //           res.status(400).send({ message: `Failed! Role ${req.body.roles[i]} does not exist!` });
  //           return;
  //         }
  //         next();
  //       });
  //     }
  //   }
  //   next();
  // };

  const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
  };

  module.exports = verifySignUp;
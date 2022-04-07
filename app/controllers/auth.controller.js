const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;
const Role = db.RoleType;
const SportsType = db.SportsType;
const nodemailer = require("nodemailer");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const axios = require("axios");
const { response } = require("express");

exports.signin = async (req, res) => {
  await User.findOne({
    $or: [
      {
        email: req.body.username,
      },
      {
        username: req.body.username,
      },
    ],
  })
    .populate("role")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err,
        });
        return;
      }

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User Not found.",
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          success: false,
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.TOKEN_SECRET, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          profile_pic: user.profile_pic != null ? user.profile_pic : "",
          gender: user.gender != null ? user.gender : "",
          age: user.age != null ? user.age : "",
          subscription_id: user.subscription_id ? user.subscription_id : "",
          roles:
            user.role != null
              ? {
                  id: user.role.id,
                  name: user.role.name,
                  isactive: true,
                  permissions: {
                    role: {
                      add: user.role.roles ? "Allowed" : "NotAllowed",
                      edit: user.role.roles ? "Allowed" : "NotAllowed",
                      view: user.role.roles ? "Allowed" : "NotAllowed",
                      delete: user.role.roles ? "Allowed" : "NotAllowed",
                    },
                    coach: {
                      add: user.role.coach ? "Allowed" : "NotAllowed",
                      edit: user.role.coach ? "Allowed" : "NotAllowed",
                      view: user.role.coach ? "Allowed" : "NotAllowed",
                      delete: user.role.coach ? "Allowed" : "NotAllowed",
                    },
                    athlete: {
                      add: user.role.athlete ? "Allowed" : "NotAllowed",
                      edit: user.role.athlete ? "Allowed" : "NotAllowed",
                      view: user.role.athlete ? "Allowed" : "NotAllowed",
                      delete: user.role.athlete ? "Allowed" : "NotAllowed",
                    },
                    program: {
                      add: user.role.program ? "Allowed" : "NotAllowed",
                      edit: user.role.program ? "Allowed" : "NotAllowed",
                      view: user.role.program ? "Allowed" : "NotAllowed",
                      delete: user.role.program ? "Allowed" : "NotAllowed",
                    },
                    pricing: {
                      add: user.role.package ? "Allowed" : "NotAllowed",
                      edit: user.role.package ? "Allowed" : "NotAllowed",
                      view: user.role.package ? "Allowed" : "NotAllowed",
                      delete: user.role.package ? "Allowed" : "NotAllowed",
                    },
                    sport: {
                      add: user.role.sport ? "Allowed" : "NotAllowed",
                      edit: user.role.sport ? "Allowed" : "NotAllowed",
                      view: user.role.sport ? "Allowed" : "NotAllowed",
                      delete: user.role.sport ? "Allowed" : "NotAllowed",
                    },
                    faq: {
                      add: user.role.faq ? "Allowed" : "NotAllowed",
                      edit: user.role.faq ? "Allowed" : "NotAllowed",
                      view: user.role.faq ? "Allowed" : "NotAllowed",
                      delete: user.role.faq ? "Allowed" : "NotAllowed",
                    },
                    testimonial: {
                      add: user.role.testimonial ? "Allowed" : "NotAllowed",
                      edit: user.role.testimonial ? "Allowed" : "NotAllowed",
                      view: user.role.testimonial ? "Allowed" : "NotAllowed",
                      delete: user.role.testimonial ? "Allowed" : "NotAllowed",
                    },
                    blog: {
                      add: user.role.blog ? "Allowed" : "NotAllowed",
                      edit: user.role.blog ? "Allowed" : "NotAllowed",
                      view: user.role.blog ? "Allowed" : "NotAllowed",
                      delete: user.role.blog ? "Allowed" : "NotAllowed",
                    },
                    home: {
                      add: user.role.home ? "Allowed" : "NotAllowed",
                      edit: user.role.home ? "Allowed" : "NotAllowed",
                      view: user.role.home ? "Allowed" : "NotAllowed",
                      delete: user.role.home ? "Allowed" : "NotAllowed",
                    },
                  },
                }
              : null,
          contact: user.contact,
          accessToken: token,
        },
      });
    });
};

exports.signup = async (req, res) => {
  try {
    
    if (!req.body) {
      winston.debug(`Invalid detail ${req.body}`);
      res.status(400).send({
        message: "Invalid detail",
      });
    } else {
      const roleObject = await Role.findOne({ name: "Admin" });
      await Role.findOne({ name: "Athlete" }, function (err, role) {
        var user = new User({
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
          name: req.body.firstname + " " + req.body.lastname,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          role: role._id,
          sports: req.body.sports_id,
          coach_id: roleObject._id,
          gender: req.body.gender,
          age: req.body.age,
          level: req.body.level != null ? req.body.level : "",
          aimlevel: req.body.aimlevel != null ? req.body.aimlevel : "",
          best_suits: req.body.best_suits != null ? req.body.best_suits : "",
        });

        user.save((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          // var all_sports_name = "";
          // all_sports.each(function (err, item) {
          //   // If the item is null then the cursor is exhausted/empty and closed
          //   all_sports_name += item.name + ",";
          //   // otherwise, do something with the item
          // });

          //send email
          let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: config.EMAIL_ID,
              pass: config.EMAIL_PASSWORD,
            },
          });

          var mailOptions = {
            from: `${req.body.email}`,
            to: "wbadel79@hotmail.com",
            subject: "New Athelete Registered Successfully",
            html:
              `<label for="html"><b>Name</b> </label> ${req.body.firstname} ${req.body.lastname}<br>` +
              `<label for="html"><b>Email</b> </label> ${req.body.email}<br>` +
              `<label for="html"><b>Gender</b> </label> ${req.body.gender}<br>` +
              `<label for="html"><b>Age</b> </label> ${req.body.age}<br>` +
              `<label for="html"><b>Level</b> </label> ${req.body.level}<br>` +
              `<label for="html"><b>Aim Level</b> </label> ${req.body.aimlevel}<br>` +
              `<label for="html"><b>Best Suits</b> </label> ${req.body.best_suits}<br>`
              
          };
          mailTransporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log(info);
            }
          });

          res.send({
            message: "User registered successfully!",
            data: user,
          });
        });
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something is wrong: " + error,
    });
  }
};

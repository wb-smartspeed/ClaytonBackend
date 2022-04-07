const db = require("../models");
const User = db.User;
const RoleType = db.RoleType;
const SportsType = db.SportsType;
const AthleteCoachMapping = db.AthleteCoachMapping;
const axios = require("axios");
const config = require('../config/paypal.config');

var access_token = "";
async function myFunction2() {
  await axios
    .post(
      "https://api.sandbox.paypal.com/v1/oauth2/token",
      {},
      {
        auth: {
          username:
            config.PAYPAL_CLIENTID,
          password:
          config.PAYPAL_SECRET,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        params: {
          grant_type: "client_credentials",
        },
      }
    )
    .then((response) => {
      access_token = "";
      access_token = response.data.access_token;
    })
    .catch((error) => {
      console.log(error.response);
    });
}


exports.AddCoachUser = async (req, res) => {

  try {

    if (!req.body) {
      res.status(400).send({
        success: false,
        "message": "Invalid user detail"
      })
    }
    else {
      const sportObject = await SportsType.findOne({ _id: req.body.sports_id });
      if (sportObject) {
        await RoleType.findOne({ name: 'Coach' }, function (err, role) {
          if (role) {
            var userObject = new User({
              username: req.body.username,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 8),
              name: req.body.firstname+" "+req.body.lastname,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
              role: role._id,
              contact: req.body.contact,
              profile_pic: req.body.profile_pic,
              sports: req.body.sports_id,
              biography: req.body.biography,
              skills: req.body.skills,
              gender: req.body.gender,
              level:req.level!= null?req.level:"",
                aimlevel:req.aimlevel!= null?req.aimlevel:"",
                 best_suits:req.best_suits!= null?req.best_suits:""
            });
            userObject.save((err, user) => {
              if (err) {
                res.status(500).send({
                  success: false,
                  message: err
                });
                return;
              }
              res.send({
                success: true,
                "message": "User registered successfully!",
                "data": user
              })
            });

          } else {
            res.status(500).send({
              success: false,
              message: "Role Id Invalid " + err
            });
          }
        });
      }
      else {
        res.status(500).send({
          success: false,
          message: "Sports Id Invalid"
        });
      }
    }

  }
  catch (err) {
    res.status(500).send({
      success: false,
      message: "Something is wrong with request !"
    });
  }
};


exports.AddAthleteUser = async (req, res) => {

  try {

    if (!req.body) {
      res.status(400).send({
        success: false,
        "message": "Invalid user detail"
      })
    }
    else {

      const isSportsExist = await SportsType.findOne({ _id: req.body.sports_id });

      if (isSportsExist) {
        const roleObject = await RoleType.findOne({ name: "Admin" });
          await RoleType.findOne({ name: 'Athlete' }, function (err, role) {
            if (role) {
              var userObject = new User({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                name: req.body.firstname+" "+req.body.lastname,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
                role: role._id,
                sports: req.body.sports_id,
                contact: req.body.contact,
                profile_pic: req.body.profile_pic,
                age: req.body.age,
                gender: req.body.gender,
                coach_id: roleObject._id,
                level:req.level!= null?req.level:"",
                aimlevel:req.aimlevel!= null?req.aimlevel:"",
                 best_suits:req.best_suits!= null?req.best_suits:""
              });
              userObject.save((err, user) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                var mappingObject = new AthleteCoachMapping({
                  athelete_id: user._id,
                  coach_id: req.body.coach_id
                });

                mappingObject.save((err, mapping) => {
                  if (err) {
                    res.status(500).send({ message: err });
                  }
                })

                res.send({
                  success: true,
                  "message": "User registered successfully!",
                  "data": user
                })
              });

            } else {
              res.status(400).send({
                success: false,
                message: "Role Invalid"
              });
            }
          });
      }
      else {
        res.status(500).send({
          success: false,
          message: "Sports Invalid"
        });
      }

    }
  }
  catch (err) {
    res.status(500).send({
      success: false,
      message: "Something is wrong with request !"
    });
  }
};

exports.getAllCoaches = async (req, res, next) => {
  try {
    const roleObject = await RoleType.findOne({ name: "Coach" });
    const users = await User.find({
      role: roleObject._id
    }).sort('-created_at').populate('role').populate("sports") // multiple path names in one requires mongoose >= 3.6
      .exec(function (err, data) {
        res.status(200).json({
          data: data.map(function (value) {
            console.log(value);
            return {
              id: value._id,
              name: value.name,
              firstname: value.firstname != null ? value.firstname:"",
              lastname: value.lastname != null ? value.lastname:"",
              email: value.email,
              createdAt: value.createdAt,
              username: value.username,
              role: value.role ? {
                id: value.role.id,
                name: value.role.name
              } : {},
              sports: value.sports ? {
                id: value.sports.id,
                name: value.sports.name
              } : {},
              profile_pic: value.profile_pic != null ? value.profile_pic : '',
              gender: value.gender != null ? value.gender : '',
              contact: value.contact,
              biography: value.biography != null ? value.biography : "",
              skills: value.skills,
              level:value.level!= null?value.level:"",
              aimlevel:value.aimlevel!= null?value.aimlevel:"",
               best_suits:value.best_suits!= null?value.best_suits:""
            }
          })
        });
      });
  }
  catch (error) {
    next(error)
  }
};


exports.getAllAthletes = async (req, res, next) => {
  try {
    const roleObject = await RoleType.findOne({ name: "Athlete" });
    const users = await User.find({ role: roleObject._id }).sort('-created_at').populate('coach_id')
      .populate('role')
      .populate('sports',"-__v")
      .exec(function (err, data) {
        // data=data.filter((el)=>{
        //   console.log(el);
        //   return el.coach_id!=null;
        // })
        res.status(200).json({
          data: data.map(function (value) {
            return {
              id: value._id,
              name: value.name,
              firstname: value.firstname != null ? value.firstname:"",
              lastname: value.lastname != null ? value.lastname:"",
              email: value.email,
              createdAt: value.created_at,
              username: value.username,
              age: value.age != null ? value.age : '',
              role: value.role != null ? {
                id: value.role._id,
                name: value.role.name
              } : null,
              sports: value.sports,
              coach: value.coach_id ? {
                id: value.coach_id._id,
                name: value.coach_id.name
              } : null,
              profile_pic: value.profile_pic != null ? value.profile_pic : '',
              contact: value.contact,
              gender: value.gender != null ? value.gender : '',
              level:value.level!= null?value.level:"",
              aimlevel:value.aimlevel!= null?value.aimlevel:"",
               best_suits:value.best_suits!= null?value.best_suits:""
            }
          })
        });
      });
  }
  catch (error) {
    next(error)
  }
};

exports.getCoachUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate('role').populate("sports")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!user) return next(res.status(401).json({
          message: 'user does not exist'
        }));
        res.status(200).json({
          data: {
            id: user._id,
            name: user.name,
            firstname: user.firstname != null ? user.firstname:"",
            lastname: user.lastname != null ? user.lastname:"",
            email: user.email,
            createdAt: user.createdAt,
            username: user.username,
            role: user.role ? {
              id: user.role.id,
              name: user.role.name
            } : {},
            sports: user.sports ? {
              id: user.sports.id,
              name: user.sports.name
            } : {},
            profile_pic: user.profile_pic != null ? user.profile_pic : '',
            gender: user.gender != null ? user.gender : '',
            contact: user.contact,
            biography: user.biography != null ? user.biography : "",
            skills: user.skills,
            level:user.level!= null?user.level:"",
              aimlevel:user.aimlevel!= null?user.aimlevel:"",
               best_suits:user.best_suits!= null?user.best_suits:""
          }
        });
      });

  } catch (error) {
    next(error)
  }
}

exports.getAthleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId }).populate('coach_id')
      .populate('role')
      .populate('sports', '-__v')
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!user) return next(res.status(401).json({
          message: 'user does not exist'
        }));
        res.status(200).json({
          data: {
            id: user._id,
            name: user.name,
            firstname: user.firstname != null ? user.firstname:"",
            lastname: user.lastname != null ? user.lastname:"",
            email: user.email,
            createdAt: user.created_at,
            username: user.username,
            age: user.age != null ? user.age : '',
            role: user.role != null ? {
              id: user.role.id,
              name: user.role.name
            } : null,
            sports: user.sports,
            coach: user.coach_id ? {
              id: user.coach_id._id,
              name: user.coach_id.name
            } : null,
            profile_pic: user.profile_pic != null ? user.profile_pic : '',
            gender: user.gender != null ? user.gender : '',
            contact: user.contact,
            level:user.level!= null?user.level:"",
            aimlevel:user.aimlevel!= null?user.aimlevel:"",
             best_suits:user.best_suits!= null?user.best_suits:""
          }
        });
      });

  } catch (error) {
    next(error)
  }
}

exports.updateCoachUser = async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(400).send({
        "message": "Invalid user Id"
      })
    } else {
      await User.findByIdAndUpdate(req.params.userId, {
        name: req.body.firstname+" "+req.body.lastname,
        firstname: req.body.firstname != null ? req.body.firstname:"",
        lastname: req.body.lastname != null ? req.body.lastname:"",
        contact: req.body.contact,
        profile_pic: req.body.profile_pic,
        sports: req.body.sports_id,
        biography: req.body.biography,
        skills: req.body.skills,
        gender: req.body.gender,
        level:req.level!= null?req.level:"",
        aimlevel:req.aimlevel!= null?req.aimlevel:"",
         best_suits:req.best_suits!= null?req.best_suits:""
      }).then(user => {
        res.status(200).send({
          "message": "User Detail Updated",
          "data": user
        })
      }).catch(ex => {
        res.status(500).send({
          "message": "Something is wrong " + ex
        })
      })
    }

  } catch (error) {
    next(error)
  }
}

exports.updateAthleteUser = async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(400).send({
        "message": "Invalid user Id"
      })
    } else {
      await User.findByIdAndUpdate(req.params.userId, {
        name: req.body.firstname+" "+req.body.lastname,
        firstname: req.body.firstname != null ? req.body.firstname:"",
        lastname: req.body.lastname != null ? req.body.lastname:"",
        sports: req.body.sports_id,
        contact: req.body.contact,
        profile_pic: req.body.profile_pic,
        gender: req.body.gender,
        age: req.body.age,
        coach_id: req.body.coach_id,
        level:req.body.level!= null?req.body.level:"",
            aimlevel:req.body.aimlevel!= null?req.body.aimlevel:"",
             best_suits:req.body.best_suits!= null?req.body.best_suits:""
      }).then(user => {

        let mappingObject = AthleteCoachMapping.findOneAndUpdate({ athelete_id: req.params.id }, {
          athelete_id: user._id,
          coach_id: req.body.coach_id
        });

        res.status(200).send({
          "message": "User Detail Updated",
          "data": req.body
        })
      }).catch(ex => {
        res.status(500).send({
          "message": "Invalid user ID"
        })
      })
    }

  } catch (error) {
    next(error)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId).then(user => {
      AthleteCoachMapping.findOneAndRemove({ athelete_id: req.params.userId }, function (err) { });

      if (!user) {
        res.status(404).send({
          success: false,
          "message": "User not found"
        })
      } else {
        res.status(200).send({
          success: true,
          message: "User deleted successfully."
        });
      }
    }).catch(ex => {
      res.status(500).send({
        "message": "Invalid user ID"
      })
    });
  } catch (error) {
    res.status(500).send({
      "message": "Something is wrong with user."
    })

  }
};


exports.userSubscriptionDetails = async (req, res) => {
  await myFunction2();
  const user = await User.findOne({ _id: req.userId })
  if(user.subscription_id){
    const config = {
      method: "get",
      url: `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${user.subscription_id}`,
      headers: {
        accept: "application/json",
        "accept-language": "en_US",
        "content-type": "application/json; charset=utf8",
        Authorization: "Bearer " + access_token,
      },
    };
    await axios(config)
      .then((response) => {
        console.log(response.data)
        res.send({
          success: true,
          data: {
                is_active:response.data.status=='ACTIVE'?true:false,
                plan_id:response.data.plan_id,
                subscription_id:user.subscription_id
          }
        });
      })
      .catch((error) => {
        res.status(500).send({
          success: false,
          message: error,
        });
      });
  }
  res.send({
    success: true,
          data: {
                is_active:false,
          }
  });
  
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const roleObject = await RoleType.findOne({ name: "Admin" });
    const users = await User.find({
      role: { $ne: roleObject._id } 
    });
    res.status(200).json({
      data: users.map(function (value) {
        return {
          id: value._id,
          name: value.name,
          firstname: value.firstname,
          lastname: value.lastname,
          email: value.email,
          createdAt: value.createdAt,
          username: value.username,
          profile_pic: value.profile_pic != null ? value.profile_pic : '',
          gender: value.gender != null ? value.gender : '',
          contact: value.contact,
          biography: value.biography != null ? value.biography : "",
          skills: value.skills,
          level:value.level!= null?value.level:"",
          aimlevel:value.aimlevel!= null?value.aimlevel:"",
           best_suits:value.best_suits!= null?value.best_suits:""
        }
      })
    });
  }
  catch (error) {
    next(error)
  }
};


exports.updateUserDetails = async (req, res, next) => {

  console.log(req.body);
  try {
    if (!req.body) {
      res.status(400).send({
        "message": "Invalid details"
      })
    } else {
      var userObject=await User.findByIdAndUpdate(req.userId);
      console.log(req.body);
      console.log(userObject);
      await User.findByIdAndUpdate(req.userId, {
        name: req.body.name,
        contact: req.body.contact,
        email:req.body.email,
        username: req.body.username,
        password:req.body.password!=null?bcrypt.hashSync(req.body.password, 8):userObject.password
      }).then(user => {

        res.status(200).send({
          "message": "User Detail Updated",
          "data": req.body
        })
      }).catch(ex => {
        res.status(500).send({
          "message": "Invalid user ID"
        })
      })
    }

  } catch (error) {
    next(error)
  }
}

const nodemailer = require("nodemailer");
const config = require("../config/auth.config");
const db = require("../models");
const Email = db.Email;
const EmailUser = db.EmailUser;
const moment = require("moment");

exports.sendEmail = async (req, res) => {
  try {
    let email_id;
    if (!req.body.email) {
      res.send({
        success: false,
        message: "Email cannot be empty",
      });
    }
    let mailTransporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.EMAIL_ID,
        pass: config.EMAIL_PASSWORD,
      },
    });

    
   await EmailUser.findOne({ user_email: req.body.email }).then((exist) => {
      if (exist) {
        email_id = exist._id;
        EmailUser.findOneAndUpdate({ _id: email_id }, {
          updatedAt:Date.now,
          isread:false
      }).then(data => {
         console.log('updated')
      }).catch(ex => {
          res.status(500).send({
              "message": ex
          })
      });
      } else {
        const emailuser = new EmailUser({
          name: req.body.name,
          user_email: req.body.email,
          isread:false
        });
        emailuser
          .save()
          .then((data) => {
            email_id = data._id;
          })
          .catch((err) => {
            console.log("error" + err);
            res.status(500).send(err);
          });
      }
    });

  
    console.log(req.body.email);

    var mailOptions = {
      from: `${req.body.name} "${req.body.email}`,
      to: 'wbadel79@hotmail.com',//config.EMAIL_ID,
      subject: req.body.subject,
      html: req.body.body,
    };

    mailTransporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
        res.status(500).send(error);
      } else {

        const email = new Email({
          name: req.body.name,
          from: req.body.email,
          to: config.EMAIL_ID,
          subject: req.body.subject,
          body: req.body.body,
          response: info.response,
          unique_email_id: email_id,
          phone:req.body.phone
        });
        email
          .save()
          .then((data) => {
            res.send({
              success: true,
              message: "Email has sent successfully",
              data: data,
            });
          })
          .catch((err) => {
            console.log("error" + err);
            res.status(500).send(err);
          });

        
      }
    });
  } catch (err) {}
};

exports.sendReplyEmail = async (req, res) => {
  try {
    if (!req.body.to || req.body.to==null) {
      res.send({
        success: false,
        message: "Email cannot be empty",
      });
    }
    let mailTransporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.EMAIL_ID,
        pass: config.EMAIL_PASSWORD,
      },
    });
    console.log(req.body.to);

    var mailOptions = {
      from: config.EMAIL_ID,
      to: req.body.to,
      subject: req.body.subject,
      html: req.body.body,
    };

    mailTransporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).send(error);
      } else {
        EmailUser.findOne({ user_email: req.body.to }).then((exist) => {
          console.log(exist);
          if(exist){
            const email = new Email({
              name: req.body.name,
              from:config.EMAIL_ID ,
              to: req.body.to,
              subject: req.body.subject,
              body: req.body.body,
              response: info.response,
              is_admin: true,
              unique_email_id:exist._id,
            });
            email
              .save()
              .then((data) => {
                res.send({
                  success: true,
                  message: "Email has sent successfully",
                  data: data,
                });
              })
              .catch((err) => {
                console.log("error" + err);
                res.status(500).send(err);
              });
          }
          else{
            res.status(400).send("Something is wrong");
          }
        });
      }
    });
  } catch (err) {}
};


exports.getAllUserEmail = async (req, res) => {
  try {
    
      const users = await EmailUser.find().sort({createdAt:-1});
      
      if (!users) {
          res.status(500).send({
              "message": "There are no emails"
          })
      } else {
          res.status(200).send({
              data: users.map(function (value) {
               return{
                name:value.name,
                _id:value._id,
                user_email:value.user_email,
                isread:value.isread,
                createdAt:value.createdAt
               } 
              })
          })
      }
  } catch (err) {
      res.status(500).send(err)
  }
}

exports.getAllEmailsByUser = async (req, res) => {
  try {
    
      const emails = await Email.find({unique_email_id:req.params.id});
      
      if (!emails) {
          res.status(500).send({
              "message": "There are no emails"
          })
      } else {
          res.status(200).send({
              data: emails.map(function (value) {
                return {
                  id: value._id,
                  name:value.name,
                  phone:value.phone,
                  from: value.from,
                  to: value.to,
                  subject:value.subject,
                  body:value.body,
                  is_admin:value.is_admin,
                  sent_date:moment(value.createdAt).format("MM/DD/YYYY h:mm a")
                }
              })
          })
      }
  } catch (err) {
    console.log(err)
      res.status(500).send(err)
  }
}


exports.updateIsRead = async (req, res) => {
  // Validate request
  if (!req.params.id) {
      return res.status(400).send({
          message: "Id cannot be null"
      });
  }
  else {

    EmailUser.findById(req.params.id).then(instance => {
console.log(instance)
      return instance.update({ isread:true,updatedAt:instance.updatedAt}, {
      });
    }).then(instance => {
      res.status(200).send({
        "message": "Email Detail Updated"
    })
  }).catch(ex => {
    console.log(ex)
      res.status(500).send({
          "message": ex
      })
  });
  }
}

exports.deleteEmail = async (req, res) => {
  try {
      //Delete Blog
      await Email.findByIdAndRemove({unique_email_id:req.params.id})
          .then(data => {
              if (!data) {
                  res.status(404).send({
                      success: false,
                      "message": "Emails not found"
                  })
              } else {
                  res.status(200).send({
                      success: true,
                      message: "Emails deleted successfully."
                  });
              }
          }).catch(err => {
              res.status(500).send({
                  success: false,
                  "message": "Something went wrong"
              })
          })
  }
  catch (err) {
      res.status(400).send({
          success: false,
          message: `Something is wrong with description!`
      });
      return;
  }

};
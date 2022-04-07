const nodemailer = require("nodemailer");
const config = require("../config/auth.config");
const db = require("../models");
const ChatUser = db.ChatUser;
const ChatMessage = db.ChatMessage;
const moment = require("moment");

exports.sendChat = async (req, res) => {
  try {
    if (!req.body.message) {
      res.send({
        success: false,
        message: "Massage cannot be empty",
      });
    }

    let user_id=req.body.user_id?req.body.user_id:req.userId
    let chat_user_id;
    await ChatUser.findOne({ user_id: user_id }).then((exist) => {
      if (exist) {
        chat_user_id = exist._id;
        ChatUser.findOneAndUpdate({ _id: chat_user_id }, {
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
        const chatuser = new ChatUser({
          user_id: user_id,
          isread:false
        });
        chatuser
          .save()
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log("error" + err);
            res.status(500).send(err);
          });
      }
    });


    const message = new ChatMessage({
      message: req.body.message,
      user_id:req.body.user_id?req.body.user_id:req.userId,
      is_admin:req.body.user_id?true:false
    });
    message
      .save()
      .then((data) => {
        res.send({
          success: true,
          message: "Message has sent successfully",
          data: data,
        });
      })
      .catch((err) => {
        console.log("error" + err);
        res.status(500).send(err);
      });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllChatByUser = async (req, res) => {
  try {
    const chats = await ChatMessage.find({ user_id: req.params.id });

    if (!chats) {
      res.status(500).send({
        message: "There are no chats",
      });
    } else {
      res.status(200).send({
        data: chats.map(function (value) {
          return {
            id: value._id,
            message: value.message,
            is_admin: value.is_admin,
            sent_date: moment(value.createdAt).format("MM/DD/YYYY h:mm a"),
          };
        }),
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.getAllUserChat = async (req, res) => {
  try {
    
       await ChatUser.find().sort({createdAt:-1}).populate("user_id")
      .exec((err, data) => {

        console.log(data);
        if (!data) {
          res.status(500).send({
              "message": "There are no chats"
          })
      } else {
          res.status(200).send({
              data: data.map(function (value) {
             return{
             id:value._id,
             user_id:value.user_id,
             isread:value.isread,
             createdAt:value.createdAt
             } 
              })
          })
      }
      })
  } catch (err) {
      res.status(500).send(err)
  }
}

exports.getSelfChat = async (req, res) => {
  try {
    const chats = await ChatMessage.find({ user_id: req.userId });

    if (!chats) {
      res.status(500).send({
        message: "There are no chats",
      });
    } else {
      res.status(200).send({
        data: chats.map(function (value) {
          return {
            id: value._id,
            message: value.message,
            is_admin: value.is_admin,
            sent_date: moment(value.createdAt).format("MM/DD/YYYY h:mm a"),
          };
        }),
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.updateIsRead = async (req, res) => {
  // Validate request
  if (!req.params.id) {
    return res.status(400).send({
      message: "Id cannot be null",
    });
  } else {
    ChatUser.findOne({user_id:req.params.id})
      .then((instance) => {
        console.log(instance);
        return instance.update(
          { isread: true, updatedAt: instance.updatedAt },
          {}
        );
      })
      .then((instance) => {
        res.status(200).send({
          message: "Message Detail Updated",
        });
      })
      .catch((ex) => {
        console.log(ex);
        res.status(500).send({
          message: ex,
        });
      });
  }
};

exports.deleteChats = async (req, res) => {
  try {
      //Delete Blog
      await ChatMessage.findByIdAndRemove({ user_id: req.params.id })
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
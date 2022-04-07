const db = require("../models");
const SettingSocial = db.SettingSocial;

exports.createSocial = async (req, res) => {
  // Validate request

  let get_soacial = await SettingSocial.findOne({});

  if (get_soacial) {
    await SettingSocial.findOneAndUpdate(
      { _id: get_soacial._id },
      {
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        linkedin: req.body.linkedin,
        instagram: req.body.instagram,
      }
    )
      .then((data) => {
        res.status(200).send({
          message: "Socials Detail Updated",
          data: data,
        });
      })
      .catch((ex) => {
        res.status(500).send({
          message: "Invalid Socials ID",
        });
      });
  } else {
    const settingmeta = new SettingSocial({
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
      instagram: req.body.instagram,
    });
    settingmeta
      .save()
      .then((data) => {
        res.send({
          success: true,
          message: "Socials added successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
};

exports.getSingleSocial = async (req, res) => {
  try {
    await SettingSocial.findOne({})
      .then((data) => {
        if (!data) {
          res.status(404).send({
            success: false,
            message: "There is no Soacials, Please add your first.",
          });
        } else {
          res.status(200).send({
            success: true,
            data: data,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: "Something went wrong",
        });
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

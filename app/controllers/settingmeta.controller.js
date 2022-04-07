const db = require("../models");
const SettingMetaTag = db.SettingMetaTag;

exports.createMetaTag = async (req, res) => {
  // Validate request
  
    let get_meta_tags = await SettingMetaTag.findOne({});

    if (get_meta_tags) {
      await SettingMetaTag.findOneAndUpdate(
        { _id: get_meta_tags._id },
        {
          description: req.body.description,
          og_title: req.body.og_title,
          og_description: req.body.og_description,
          og_sitename: req.body.og_sitename,
        }
      )
        .then((data) => {
          res.status(200).send({
            message: "MetaTags Detail Updated",
            data: data,
          });
        })
        .catch((ex) => {
          res.status(500).send({
            message: "Invalid MetaTags ID",
          });
        });
    } else {
      const settingmeta = new SettingMetaTag({
        description: req.body.description,
        og_title: req.body.og_title,
        og_description: req.body.og_description,
        og_sitename: req.body.og_sitename,
      });
      settingmeta
        .save()
        .then((data) => {
          res.send({
            success: true,
            message: "Meta tags added successfully",
            data: data,
          });
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }
};

exports.getSingleMetaTag = async (req, res) => {
    try {
        await SettingMetaTag.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no Metatags, Please add your first."
                })
            } else {
                res.status(200).send({
                    success: true,
                    data: data
                });
            }
        }).catch(err => {
            res.status(500).send({
                success: false,
                "message": "Something went wrong"
            })
        })
    } catch (err) {
        res.status(500).send(err)
    }
}
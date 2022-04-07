const db=require('../models')
const Logo=db.Logo;
const User=db.User;

exports.createLogo = async (req, res) => {
    // Validate request
    
      let get_logo = await Logo.findOne({});
  
      if (get_logo) {
        await Logo.findOneAndUpdate(
          { _id: get_logo._id },
          {
            logo: req.body.logo
          }
        )
          .then((data) => {
            res.status(200).send({
              message: "Logo Detail Updated",
              data: data,
            });
          })
          .catch((ex) => {
            res.status(500).send({
              message: "Invalid Logo ID",
            });
          });
      } else {
        const settingmeta = new Logo({
            logo: req.body.logo
        });
        settingmeta
          .save()
          .then((data) => {
            res.send({
              success: true,
              message: "Logo added successfully",
              data: data,
            });
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
  };
  
  exports.getSingleLogo = async (req, res) => {
      try {
          await Logo.findOne({}).then(data => {
              if (!data) {
                  res.status(404).send({
                      success: false,
                      "message": "There is no Logo, Please add your first."
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
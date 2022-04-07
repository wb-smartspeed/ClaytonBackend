const db = require("../models");
const ProgramNew = db.ProgramNew;
const ProgramInstruction = db.ProgramInstruction;
const User = db.User;

exports.updateProgram = async (req, res) => {
  // Validate request
  if (!req.body.subtitles) {
    return res.status(400).send({
      message: "Titles can not be empty",
    });
  } else {
    var count = 0;

    await ProgramInstruction.deleteMany({
      program: req.params.id,
      athletes: req.athlete_id!=null?req.athlete_id:req.userId
    })
      .then((data) => {
        if (!data) {
          console.log(data);
        } else {
          // console.log("Deleted subtitles")

          ProgramNew.findOneAndUpdate(
            { _id: req.params.id },
            {
              subtitles: req.body.subtitles,
            }
          )
            .then((data) => {})
            .catch((ex) => {
              res.status(500).send({
                message: "Invalid program ID",
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: "Something went wrong",
        });
      });

    req.body.subtitles.forEach((element) => {
      console.log(element);
      const programInstruction = new ProgramInstruction({
        title: element,
        ischecked: req.body.check[count],
        athletes: req.athlete_id!=null?req.athlete_id:req.userId,
        program: req.params.id,
      });

      programInstruction.save().then((subtitles) => {
        //Added
      });
      count = count + 1;
    });

    res.status(200).send({ message: "Program Updated" });
  }
};

exports.getAllProgramsByUser = async (req, res) => {
  try {
    const userId = req.params.id ? req.params.id : req.userId;
    console.log(userId);

    await ProgramNew.find({ athletes: { $in: userId }, isactive: true }).exec(
      (err, data) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).json({
          data: data.map(function (value) {
            return {
              id: value._id,
              title: value.title,
              created_at: value.created_at,
            };
          }),
        });
      }
    );
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getAllProgramSubtitlesByProgram = async (req, res) => {
  try {
    
    console.log("Access" + req.params.id);
    console.log("User" + req.userId);
    const userId = req.userId;

    await ProgramInstruction.find({
      program: req.params.id,
      athletes: userId,
    }).exec((err, data) => {
    console.log("data" + data);

      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).json({
        data: data.map(function (value) {
          return {
            id: value._id,
            title: value.title,
            created_at: value.created_at,
            ischecked: value.ischecked,
          };
        }),
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

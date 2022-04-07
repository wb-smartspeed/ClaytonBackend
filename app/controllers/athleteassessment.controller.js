const db = require("../models");
const Assessment = db.Assessment;
const AthleteAssessment = db.AthleteAssessment;
const User = db.User;
const moment = require("moment");

exports.getAllAssessmentsByUser = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);

    await Assessment.find({ isactive: true }).exec((err, data) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).json({
        data: data.map(function (value) {
          return {
            id: value._id,
            assessment: value.assessment,
            created_at: value.created_at,
          };
        }),
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.addAthleteAssessment = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Note content can not be empty",
      });
    } else {
      console.log(req.body.date + "===" + Date.now());

      let athlete_id = req.userId;

      if (req.body.athlete_id) {
        athlete_id = req.body.athlete_id;
      }
      var id_date_exists = await AthleteAssessment.findOne({
        date: new Date(req.body.date + "z"),
        athlete_id: athlete_id,
        assessment_id: req.body.assessment_id,
      });
      console.log(id_date_exists);
      if (!id_date_exists) {
        console.log(new Date(req.body.date));
        const assessment = new AthleteAssessment({
          date: new Date(req.body.date + "z"),
          speed: req.body.speed,
          time: req.body.time ? req.body.time : 0,
          jump: req.body.jump,
          thumbnail_image: req.body.thumbnail_image,
          video_url: req.body.video_url,
          assessment_id: req.body.assessment_id,
          athlete_id: athlete_id,
          created_at: new Date(),
        });

        console.log(assessment);
        assessment
          .save()
          .then((data) => {
            res.send({
              success: true,
              message: "Assesment added successfully",
              data: data,
            });
          })
          .catch((err) => {
            console.log("error" + err);
            res.status(500).send(err);
          });
      } else {
        res.send({
          success: false,
          message: "You cannot add duplicate date",
        });
      }
    }
  } catch (error) {
    console.log("error" + error);
    return res.status(500).send({
      message: error,
    });
  }
};

exports.getAthletesAssesmentSprint = async (req, res) => {
  try {
    await AthleteAssessment.find({
      assessment_id: req.params.id,
      athlete_id: req.userId,
    })
      .then((data) => {
        if (data.length > 0) {
          //   console.log(data);

          if (data[0].jump == null) {
            var total_time = data.reduce(function (prev, cur) {
              return prev + cur.time;
            }, 0);

            var max_time = Math.max(...data.map((o) => o.time));
            var max_speed = Math.max(...data.map((o) => o.speed));

            var dates = data.map(function (x) {
              return new Date(x.date);
            });

            var max_date = new Date(Math.max.apply(null, dates));
            var min_date = new Date(Math.min.apply(null, dates));

            res.status(200).json({
              data: {
                "Average Time":
                  total_time > 0
                    ? Math.round((total_time / data.length) * 10) / 10
                    : 0,
                "Personal Best": max_time,
                "Fastest Speed": max_speed,
                "Total Sprint": data.length,
                max_date: max_date,
                min_date: min_date,
              },
            });
          } else {
            var max_jump = Math.max(...data.map((o) => o.jump));
            var min_jump = Math.min(...data.map((o) => o.jump));
            res.status(200).json({
              data: {
                "Personal Best": max_jump,
                "Lowest Jump": min_jump,
                "Total Jump": data.length,
              },
            });
          }
        } else {
          res.status(200).json({
            message: "There is no data",
            data: {},
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

exports.getAllAthleteAssessmentCharts = async (req, res) => {
  const filter = {};

  Object.assign(filter, {
    assessment_id: req.params.id,
    athlete_id: req.userId,
  });

  if (
    req.query.days != undefined &&
    req.query.days != "undefined" &&
    req.query.days != ""
  ) {
    const day = Number(req.query.days);
    // Object.assign(filter, {
    //     date: {
    //         $gte: moment().add(-day, "days"),
    //     }
    // });
  }

  await AthleteAssessment.find(filter)
    .sort({ date: 1 })
    .then((data) => {
        if (data.length > 0) {
            if (data[0].jump == null) {
                let result = data.map(function (value) {
                  return {
                    y: value.time,
                    marker: value.video_url
                      ? {
                          symbol: "url(assets/icons/play.svg)",
                        }
                      : null,
                    date: moment(value.date).format("DD MMM YYYY"),
                    time: value.time + " Seconds",
                    speed: value.speed + " Km/h",
                    video: value.video_url ? value.video_url : "",
                    thumbnail: value.thumbnail_image ? value.thumbnail_image : "",
                  };
                });
        
                let categories = result.map(function (value) {
                  return value.date;
                });
                res.status(200).json({
                  data: {
                    data: result,
                    xAxis: categories,
                  },
                });
              } else {
                let result = data.map(function (value) {
                  return {
                    y: value.time,
                    marker: value.video_url
                      ? {
                          symbol: "url(assets/icons/play.svg)",
                        }
                      : null,
                    date: moment(value.date).format("DD MMM YYYY"),
                    jump: value.jump + " Meter",
                    video: value.video_url ? value.video_url : "",
                    thumbnail: value.thumbnail_image ? value.thumbnail_image : "",
                  };
                });
        
                let categories = result.map(function (value) {
                  return value.date;
                });
                res.status(200).json({
                  data: {
                    data: result,
                    xAxis: categories,
                  },
                });
              }
        }
        else {
            res.status(200).json({
              message: "There is no data",
              data: {},
            });
          }
      
    })
    .catch((err) => {
        console.log(err);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
      });
    });
};

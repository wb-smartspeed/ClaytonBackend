const db = require('../models')
const Assessment = db.Assessment;
const AthleteAssessment = db.AthleteAssessment;
const moment = require('moment');


exports.getAthletesAssesmentSprintById = async (req, res) => {
    try {
        await AthleteAssessment.find({ assessment_id: req.query.assessment_id, athlete_id: req.query.athlete_id }).then(data => {

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
                      "Total Sprint": data.length,
                    },
                  });
                }
              }
            else {
                res.status(200).json({
                    message: "There is no data",
                    data: {}
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

exports.getAllAthleteAssessmentChartsById = async (req, res) => {

    console.log("access")

    const filter = {};

    Object.assign(filter, { assessment_id: req.query.assessment_id, athlete_id: req.query.athlete_id });

    if (req.query.days != undefined && req.query.days != 'undefined' && req.query.days != "") {
        const day = Number(req.query.days);
        // Object.assign(filter, {
        //     date: {
        //         $gte: moment().add(-day, "days"),
        //     }
        // });
    }

    await AthleteAssessment.find(filter).sort({ date: 1 }).then(data => {

        if (data.length > 0) {
            console.log(data);
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

    }).catch(err => {
        res.status(500).send({
            success: false,
            "message": "Something went wrong"
        })
    });
}
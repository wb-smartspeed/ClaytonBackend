const db = require('../models')
const Assessment = db.Assessment;
const AthleteAssessment = db.AthleteAssessment;
const Utility = require('../common/utility');


exports.createAssessment = async (req, res) => {
    try {
        if (!req.body.assessment) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }
        else {
            const assessment = new Assessment({
                assessment: req.body.assessment,
                isactive: req.body.isactive,
                type:req.body.type
            })
            assessment.save().then(data => {
                res.send(
                    {
                        success: true,
                        message: "Assesment added successfully",
                        "data": data
                    });
            }).catch(err => {
                console.log("error" + err)
                res.status(500).send(err)
            })
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}


exports.updateAssessment = async (req, res) => {
    // Validate request
    if (!req.body.assessment) {
        return res.status(400).send({
            message: "Assessment can not be empty"
        });
    }
    else {

        if (req.body.athletes) {

            await Assessment.findOneAndUpdate({ _id: req.params.id }, {
                assessment: req.body.assessment,
                isactive: req.body.isactive,
                type:req.body.type
            }).then(data => {
                res.status(200).send({
                    "message": "Assessment Detail Updated",
                    "data": req.body
                })
            }).catch(ex => {
                res.status(500).send({
                    "message": "Invalid assessment ID"
                })
            });
        }
        else {
            res.status(500).send({
                "message": "Athletes cannot be empty"
            })
        }

    }
}

exports.getAllAssessments = async (req, res) => {
    try {

        var all_assessment = await Assessment.find({})
            .populate("athletes", "-__v")
            .exec((err, data) => {
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
                            isactive: value.isactive,
                            type:value.type
                        }
                    })
                });
            });
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getSingleAssessment = async (req, res) => {
    try {
        console.log(req.params.id)
        await Assessment.findOne({ _id: req.params.id })
            .populate("athletes", "-__v")
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                res.status(200).json({
                    data: {
                        id: data._id,
                        assessment: data.assessment,
                        created_at: data.created_at,
                        isactive: data.isactive,
                        type:data.type
                    }
                });
            });
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.deleteAssessment = async (req, res) => {
    try {
        //Delete Assessment
        Assessment.findByIdAndRemove(req.params.id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        success: false,
                        "message": "Assessment not found"
                    })
                } else {
                    AthleteAssessment.findOneAndRemove({assessment_id:req.params.id}).then(athlete=>{
                        if(athlete){
                            console.log('Athelte Deleted ')
                        }
                    })
                    res.status(200).send({
                        success: true,
                        message: "Assessment deleted successfully."
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
            message: `Something is wrong with assessment!`
        });
        return;
    }
};

exports.getAllAthleteAssessments = async (req, res) => {
    try {
        console.log("Access");
        var all_assessment = await AthleteAssessment.find({assessment_id:req.params.id})
            .populate("athlete_id", "-__v")
            .exec((err, data) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.status(200).json({
                    data: data.map(function (value) {
                        return {
                            id: value._id,
                            date: value.date,
                            speed: value.speed,
                            jump: value.jump,
                            time: value.time,
                            thumbnail_image:value.thumbnail_image,
                            video_url:value.video_url,
                            athlete_id:value.athlete_id,
                            email:value.athlete_id.email,
                            username:value.athlete_id.email,
                            assessment_id:value.assessment_id
                        }
                    })
                });
            });
    } catch (err) {
        res.status(500).send(err)
    }
}



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
                      average_time:
                        total_time > 0
                          ? Math.round((total_time / data.length) * 10) / 10
                          : 0,
                      personal_best: max_time,
                      fastest_speed: max_speed,
                      total_sprint: data.length,
                      max_date: max_date,
                      min_date: min_date,
                    },
                  });
                } else {
                  var max_jump = Math.max(...data.map((o) => o.jump));
                  var min_jump = Math.min(...data.map((o) => o.jump));
                  res.status(200).json({
                    data: {
                      personal_best: max_jump,
                      lowest_jump: min_jump,
                      total_sprint: data.length,
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
                    time: value.time + " Minutes",
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

exports.getAllAssessmentsByAthlete = async (req, res) => {
    try {

        console.log(req.params.id);

        await AthleteAssessment.find({athlete_id:req.params.id})
        .populate("assessment_id", "-__v")
        .exec((err, data) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            let assessment_data=data.map(function (value) {
            
                return {
                    id: value.assessment_id._id,
                    assessment: value.assessment_id.assessment,
                    created_at: value.assessment_id.created_at
                }
            });

            console.log(assessment_data)

            let final_data=Utility.groupBy(assessment_data,'id');
            res.status(200).json({
                data: final_data.map(function (value) {
                    return {
                        id: value.items[0].id,
                        assessment: value.items[0].assessment,
                        created_at: value.items[0].created_at
                    }
                })
            });
        });
    } catch (err) {
        res.status(500).send(err)
    }
}
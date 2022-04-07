const db=require('../models')
const ProgramNew=db.ProgramNew;
const ProgramInstruction=db.ProgramInstruction;
const User=db.User;
const AtheleteCoachMapping=db.AthleteCoachMapping;

exports.createProgram= async (req, res) => {
    try{
        if(!req.body.title) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }
        else {
                const program = new ProgramNew({
                    title : req.body.title,
                    isactive:req.body.isactive,
                    athletes :req.body.athletes,
                    subtitles:req.body.subtitles
                })
                program.save().then(data=>{
                    req.body.subtitles.forEach(element => {
                        req.body.athletes.forEach(athlete => {
                            const programInstruction=new ProgramInstruction({
                                title:element,
                                ischecked:false,
                                athletes:athlete,
                                program:data._id
                            });

                            programInstruction.save().then(subtitles=>{
                                    console.log(subtitles);
                            });
                        })
                    });

                    res.send(
                        { 
                         success:true,
                           message: "Program added successfully",
                          "data":data
                      });
                }).catch(err=>{
                    console.log("error"+err)
                    res.status(500).send(err)
                })
        }
    }
    catch(error){
        return res.status(500).send({
            message: error
        });
    }
   }

   
exports.updateProgram= async (req, res) => {
    // Validate request
    if(!req.body.title) {
       return res.status(400).send({
           message: "Program can not be empty"
       });
   }
   else {

    if(req.body.athletes){
       await ProgramNew.findOneAndUpdate({_id:req.params.id},{
            title : req.body.title,
            isactive:req.body.isactive,
            athletes : req.body.athletes,
            subtitles:req.body.subtitles
    }).then(data=>{
        res.status(200).send({
            "message":"Program Detail Updated",
            "data": req.body
        })
    }).catch(ex=>{
        res.status(500).send({
            "message":"Invalid program ID"
        })
    });
    }
    else{
        res.status(500).send({
            "message":"Athletes cannot be empty"
        })
    }
    
   }
   }

   exports.getAllPrograms= async (req,res)=>{
    try{
        console.log('all');
        ProgramNew.find({})
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
                      title: value.title,
                      athletes: value.athletes,
                      created_at:value.created_at,
                      isactive:value.isactive,
                      subtitles:value.subtitles
                  }
              })
               });
            });
    }catch(err){
        res.status(500).send(err)
    }
}

exports.getSingleProgram= async (req,res)=>{
    try{
       await ProgramNew.findOne({ _id: req.params.id})
            .populate("athletes", "-__v")
            .exec((err, data) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              res.status(200).json({
                data:{
                      id: data._id,
                      title: data.title,
                      athletes: data.athletes,
                      created_at:data.created_at,
                      isactive:data.isactive,
                      subtitles:data.subtitles
                  }
               });
            });
    }catch(err){
        res.status(500).send(err)
    }
}

exports.deleteProgram=async(req,res)=>{
    try{
        //Delete Program
        ProgramNew.findByIdAndRemove(req.params.id)
        .then(data=>{
            if(!data){
                res.status(404).send({
                    success:false,
                    "message":"Program not found"
                })
            } else {
                res.status(200).send({ 
                    success:true,
                    message: "Program deleted successfully." });
            }
        }).catch(err=>{
            res.status(500).send({
                success:false,
                "message":"Something went wrong"
            })
        })
    }
    catch(err){
    res.status(400).send({  
                            success:false,
                            message: `Something is wrong with program!`
                         });
                              return;
                            }};


                            exports.getAllProgramSubtitlesByAthlete= async (req,res)=>{
                                try{
                                    console.log('access'+req.query.athlete_id);
                                  await  ProgramInstruction.find({"program":req.params.id,"athletes": req.query.athlete_id})
                                        .exec((err, data) => {
                                          if (err) {
                                            res.status(500).send({ message: err });
                                            return;
                                          }
                                          res.status(200).json({
                                           data: data.map(function (value) {
                                              return {
                                                  id: value._id,
                                                  title: value.title,
                                                  created_at:value.created_at,
                                                  ischecked:value.ischecked
                                              }
                                          })
                                           });
                                        });
                                }catch(err){
                                    res.status(500).send(err)
                                }
                              }
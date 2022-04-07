const db=require('../models')
const VideoLibrary=db.VideoLibrary;
const User=db.User;
const AtheleteCoachMapping=db.AthleteCoachMapping;


exports.createAthleteVideoLibrary= async (req, res) => {
    try{
        if(!req.body.title) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }
        else {
                const athletes=[req.userId];
                const program = new VideoLibrary({
                    title : req.body.title,
                    isactive:req.body.isactive,
                    athletes :athletes,
                    description :req.body.description,
                    thumbnail_image : req.body.thumbnail_image,
                    video_url : req.body.video_url
                })
                program.save().then(data=>{
                    res.send(
                        { 
                         success:true,
                           message: "VideoLibrary added successfully",
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

   
   exports.getAthleteAllVideoLibraryByUser= async (req,res)=>{
    try{
        const userId=req.userId;
       await VideoLibrary.find({ "athletes": { "$in": userId },isactive:true}).sort({created_at:-1})
            .exec((err, data) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
        
              res.status(200).json({
                data: {
                        my_videos:data.filter(function (filter) {
                            return filter.isadmin ==false;
                        }).map(function (value) {
                            return {
                                id: value._id,
                                title: value.title,
                                created_at:value.created_at,
                                isactive:value.isactive,
                                description :value.description!=null?value.description:'',
                                thumbnail_image :value.thumbnail_image!=null?value.thumbnail_image:'',
                                video_url :value.video_url!=null?value.video_url:''
                            }
                        }),
                        videos:data.filter(function (filter) {
                            return filter.isadmin ==true;
                        }).map(function (value) {
                            return {
                                id: value._id,
                                title: value.title,
                                created_at:value.created_at,
                                isactive:value.isactive,
                                description :value.description!=null?value.description:'',
                                thumbnail_image :value.thumbnail_image!=null?value.thumbnail_image:'',
                                video_url :value.video_url!=null?value.video_url:''
                            }
                        })
                }
               });
            });
    }catch(err){
        res.status(500).send(err)
    }
}

  
exports.updateAthleteVideoLibrary= async (req, res) => {
    // Validate request
    if(!req.body.title) {
        console.log(req.userId);
       return res.status(400).send({
           message: "VideoLibrary title can not be empty"
       });
   }
   else {

       await VideoLibrary.findOneAndUpdate({_id:req.params.id},{
        title : req.body.title,
            isactive:req.body.isactive,
            description :req.body.description,
            thumbnail_image : req.body.thumbnail_image,
            video_url : req.body.video_url
    }).then(data=>{
        res.status(200).send({
            "message":"VideoLibrary Detail Updated",
            "data": data
        })
    }).catch(ex=>{
        res.status(500).send({
            "message":"Invalid video ID"
        })
    });
    }
   }

   exports.getAthleteSingleVideoLibrary= async (req,res)=>{
    try{
       await VideoLibrary.findOne({ _id: req.params.id})
            .exec((err, data) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              res.status(200).json({
                data:{
                      id: data._id,
                      title: data.title,
                      created_at:data.created_at,
                      isactive:data.isactive,
                      description :data.description!=null?data.description:'',
                      thumbnail_image :data.thumbnail_image!=null?data.thumbnail_image:'',
                      video_url :data.video_url!=null?data.video_url:''
                  }
               });
            });
    }catch(err){
        res.status(500).send(err)
    }
}

exports.deleteAthleteVideoLibrary=async(req,res)=>{
    try{
        //Delete VideoLibrary
        VideoLibrary.findByIdAndRemove(req.params.id)
        .then(data=>{
            if(!data){
                res.status(404).send({
                    success:false,
                    "message":"VideoLibrary not found"
                })
            } else {
                res.status(200).send({ 
                    success:true,
                    message: "VideoLibrary deleted successfully." });
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
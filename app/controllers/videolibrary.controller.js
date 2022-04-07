const db=require('../models')
const VideoLibrary=db.VideoLibrary;
const User=db.User;
const AtheleteCoachMapping=db.AthleteCoachMapping;


exports.createVideoLibrary= async (req, res) => {
    try{
        if(!req.body.title) {
            return res.status(400).send({
                message: "VideoLibrary title can not be empty"
            });
        }
        else {

                const program = new VideoLibrary({
                    title : req.body.title,
                    isactive:req.body.isactive,
                    athletes :req.body.athletes,
                    description :req.body.description,
                    thumbnail_image : req.body.thumbnail_image,
                    video_url : req.body.video_url,
                    isadmin:req.body.isadmin
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

   
exports.updateVideoLibrary= async (req, res) => {
    // Validate request
    if(!req.body.title) {
       return res.status(400).send({
           message: "VideoLibrary title can not be empty"
       });
   }
   else {

    if(req.body.athletes){
       await VideoLibrary.findOneAndUpdate({_id:req.params.id},{
            title : req.body.title,
            isactive:req.body.isactive,
            athletes : req.body.athletes,
            description :req.body.description,
            thumbnail_image : req.body.thumbnail_image,
            video_url : req.body.video_url,
            isadmin:req.body.isadmin
    }).then(data=>{
        res.status(200).send({
            "message":"VideoLibrary Detail Updated",
            "data": data
        })
    }).catch(ex=>{
        res.status(500).send({
            "message":"Invalid blog ID"
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

   exports.getAllVideoLibrarys= async (req,res)=>{
    try{
        VideoLibrary.find({})
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
                      athletes: value.athletes!=null?value.athletes.map(function(obj) {
                        return {
                            contact: obj.contact,
                            active: obj.active,
                            created_at: obj.created_at,
                            age: obj.age,
                            role: obj.role,
                            sports: obj.sports,
                            id: obj._id,
                            username: obj.username,
                            email: obj.email,
                            name: obj.name,
                            profile_pic: obj.profile_pic,
                            gender: obj.gender
                            }
                            }):[],
                      created_at:value.created_at,
                      isactive:value.isactive,
                      description :value.description!=null?value.description:'',
                      thumbnail_image :value.thumbnail_image!=null?value.thumbnail_image:'',
                      video_url :value.video_url!=null?value.video_url:'',
                      isadmin:value.isadmin
                  }
              })
               });
            });
    }catch(err){
        res.status(500).send(err)
    }
}

exports.getSingleVideoLibrary= async (req,res)=>{
    try{
       await VideoLibrary.findOne({ _id: req.params.id})
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
                      athletes: data.athletes!=null?data.athletes.map(function(obj) {
                        return {
                            contact: obj.contact,
                            active: obj.active,
                            created_at: obj.created_at,
                            age: obj.age,
                            role: obj.role,
                            sports: obj.sports,
                            id: obj._id,
                            username: obj.username,
                            email: obj.email,
                            name: obj.name,
                            profile_pic: obj.profile_pic,
                            gender: obj.gender
                            }
                            }):[],
                      created_at:data.created_at,
                      isactive:data.isactive,
                      description :data.description!=null?data.description:'',
                      thumbnail_image :data.thumbnail_image!=null?data.thumbnail_image:'',
                      video_url :data.video_url!=null?data.video_url:'',
                      isadmin:data.isadmin
                  }
               });
            });
    }catch(err){
        res.status(500).send(err)
    }
}

exports.deleteVideoLibrary=async(req,res)=>{
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
const db=require('../models')
const SportsType=db.SportsType;
const AthleteCoachMapping=db.AthleteCoachMapping;
const User=db.User;


exports.createSports= async (req, res) => {
 // Validate request
 if(!req.body.name) {
    return res.status(400).send({
        message: "Note content can not be empty"
    });
}
else {
    var isSportsExist = await SportsType.findOne({
        name : req.body.name,
        isactive:true
    })

    if(!isSportsExist){
        const sportObject = new SportsType({
            name : req.body.name,
            isactive:true
        })
        sportObject.save().then(data=>{
            res.send({
                success:true,
                "message":"Sports added successfully",
                "data":data
            })
        }).catch(err=>{
            res.status(500).send(err)
        })
    }
    else{
        res.send({
            success:false,
            "message":"Sports already exist!"
        })
    }   
}};

exports.updateSports= async (req, res) => {
    // Validate request
    if(!req.body.name) {
       return res.status(400).send({
        success:false,
           message: "Sports can not be empty"
       });
   }
   else {
   await SportsType.findOneAndUpdate({_id:req.params.id},{
        name : req.body.name,
        isactive:req.body.isactive
    }).then(data=>{
        console.log(data);
        res.status(200).send({
            success:true,
            message:"Sports Detail Updated",
            "data": req.body
        })
    }).catch(ex=>{
        res.status(500).send({
            success:false,
            message:"Invalid sports ID"
        })
    })
   }
   };

exports.getAllSports= async (req,res)=>{
        try{
            const sportObjects = await SportsType.find({active:true})
            if(!sportObjects){
                res.status(400).send({
                    success:false,
                    "message":"There are no sports"
                })
            } else {
                res.status(200).send({
                    success:true,
                    "data": sportObjects
                })
            }
        }catch(err){
            res.status(400).send({
                success:false,
                "message":"Something is wrong."
            })
        }};

    exports.deleteSports=async(req,res)=>{
        try{
         // check this sports exist or not for user
         User.findOne({
            sports_id: req.params.id
          }).exec((err, sports) => {
            if (err) {
              res.status(400).send({  
                success:false,
                message: `Something is wrong with sports!` });
              return;
            }
            if (sports) {
              res.status(400).send({ message: "Sorry, we are already using this sports for user." });
              return;
            }

            //Delete Sports
            SportsType.findByIdAndRemove(req.params.id)
            .then(sports=>{
                if(!sports){
                    res.status(404).send({
                        success:false,
                        "message":"Sports not found"
                    })
                } else {
                    res.status(200).send({
                        success:true,
                        message: "Sports deleted successfully." });
                }
            }).catch(err=>{
                res.status(500).send({
                    success:false,
                    "message":"Something went wrong"
                })
            })
          });
        }
        catch(err){
                    res.status(400).send({  
                        success:false,
                        message: `Something is wrong with Sports!` });
                    return;
        }
    }
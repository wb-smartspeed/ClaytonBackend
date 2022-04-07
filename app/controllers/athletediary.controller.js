const db = require('../models')
const Diary = db.Diary;

exports.createDiary = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }
        else {
            const diary = new Diary({
                title: req.body.title,
                athlete_id: req.userId,
                created_at:new Date()
            })
            diary.save().then(data => {

                res.send(
                    {
                        success: true,
                        message: "notes added successfully",
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



exports.getAllDiary = async (req, res) => {
    try {
        const diaries = await Diary.find({athlete_id:req.userId}).sort({ created_at: -1 })
        if (diaries.length==0) {
            res.status(500).send({
                "message": "There are no notes"
            })
        } else {
            res.status(200).send({
                "data": diaries
            })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.deleteDiary=async(req,res)=>{
    try{
        //Delete FAQ
      await Diary.findByIdAndRemove(req.params.id)
        .then(data=>{
            if(!data){
                res.status(404).send({
                    success:false,
                    "message":"Diary not found"
                })
            } else {
                res.status(200).send({ 
                    success:true,
                    message: "Diary deleted successfully." });
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
                            message: `Something is wrong with Diary !`
                         });
                              return;
                            }
                        
                        };
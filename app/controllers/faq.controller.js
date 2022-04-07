const db=require('../models')
const FAQ=db.FAQ;
const User=db.User;
const AtheleteCoachMapping=db.AthleteCoachMapping;


exports.createFAQ= async (req, res) => {
    try{
        if(!req.body.question) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }
        else {
                const faq = new FAQ({
                    question : req.body.question,
                    isactive:req.body.isactive,
                    answer : req.body.answer
                })
                faq.save().then(data=>{
     
                    res.send(
                        { 
                         success:true,
                           message: "FAQ added successfully",
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

   
exports.updateFAQ= async (req, res) => {
    // Validate request
    if(!req.body.question) {
       return res.status(400).send({
           message: "FAQ can not be empty"
       });
   }
   else {

       await FAQ.findOneAndUpdate({_id:req.params.id},{
            question : req.body.question,
            isactive:req.body.isactive,
            answer : req.body.answer
    }).then(data=>{
        res.status(200).send({
            "message":"FAQ Detail Updated",
            "data": data
        })
    }).catch(ex=>{
        res.status(500).send({
            "message":"Invalid faq ID"
        })
    });
   }
   }

   exports.getAllFAQs= async (req,res)=>{
    try{
        const faq = await FAQ.find()
        if(!faq){
            res.status(500).send({
                "message":"There are no FAQs"
            })
        } else {
            res.status(200).send({
                "data": faq
            })
        }
    }catch(err){
        res.status(500).send(err)
    }
}

exports.getSingleFAQ= async (req,res)=>{
    try{
       await FAQ.findOne({ _id: req.params.id}) .then(data=>{
        if(!data){
            res.status(404).send({
                success:false,
                "message":"FAQ not found"
            })
        } else {
            res.status(200).send({ 
                success:true,
                data: data });
        }
    }).catch(err=>{
        res.status(500).send({
            success:false,
            "message":"Something went wrong"
        })
    })
    }catch(err){
        res.status(500).send(err)
    }
}

exports.deleteFAQ=async(req,res)=>{
    try{
        //Delete FAQ
      await FAQ.findByIdAndRemove(req.params.id)
        .then(data=>{
            if(!data){
                res.status(404).send({
                    success:false,
                    "message":"FAQ not found"
                })
            } else {
                res.status(200).send({ 
                    success:true,
                    message: "FAQ deleted successfully." });
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
                            message: `Something is wrong with faq!`
                         });
                              return;
                            }
                        
                        };
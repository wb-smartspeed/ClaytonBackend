const db=require('../models')
const Testimonial=db.Testimonial;
const User=db.User;
const AtheleteCoachMapping=db.AthleteCoachMapping;


exports.createTestimonial= async (req, res) => {
    try{
        if(!req.body.name) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }
        else {
                const testimonial = new Testimonial({
                    name : req.body.name,
                    isactive:req.body.isactive,
                    testimonial : req.body.testimonial,
                    image : req.body.image!=null?req.body.image:''

                })
                testimonial.save().then(data=>{
     
                    res.send(
                        { 
                         success:true,
                           message: "Testimonial added successfully",
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

   
exports.updateTestimonial= async (req, res) => {
    // Validate request
    if(!req.body.name) {
       return res.status(400).send({
           message: "Testimonial can not be empty"
       });
   }
   else {

       await Testimonial.findOneAndUpdate({_id:req.params.id},{
            name : req.body.name,
            isactive:req.body.isactive,
            testimonial : req.body.testimonial,
            image : req.body.image!=null?req.body.image:''
    }).then(data=>{
        res.status(200).send({
            "message":"Testimonial Detail Updated",
            "data": data
        })
    }).catch(ex=>{
        res.status(500).send({
            "message":"Invalid testimonial ID"
        })
    });
    
   }
   }

   exports.getAllTestimonials= async (req,res)=>{
    try{
        const testimonial = await Testimonial.find({isactive:true})
        if(!testimonial){
            res.status(500).send({
                "message":"There are no Testimonials"
            })
        } else {
            res.status(200).send({
                "data": testimonial
            })
        }
    }catch(err){
        res.status(500).send(err)
    }
}

exports.getSingleTestimonial= async (req,res)=>{
    try{
       await Testimonial.findOne({ _id: req.params.id}) .then(data=>{
        if(!data){
            res.status(404).send({
                success:false,
                "message":"Testimonial not found"
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

exports.deleteTestimonial=async(req,res)=>{
    try{
        //Delete Testimonial
      await Testimonial.findByIdAndRemove(req.params.id)
        .then(data=>{
            if(!data){
                res.status(404).send({
                    success:false,
                    "message":"Testimonial not found"
                })
            } else {
                res.status(200).send({ 
                    success:true,
                    message: "Testimonial deleted successfully." });
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
                            message: `Something is wrong with testimonial!`
                         });
                              return;
                            }
                        
                        };
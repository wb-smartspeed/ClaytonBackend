const db=require('../models')
const Pricing=db.Pricing;
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AcVJ1Frt060aSJn12a7Tr1yLxNtLdVvyAjynREHy6C8OZhL8zvdZcqoh75SWk5QGN7ygZVe34QZK5nLS',
    'client_secret': 'EEmeFYtbX2zkqht7-nPyMEtYS_VV3tDIEAYwZ8e0Fq1xzhdnsEGbQdK25WjaC6SXZsh4_aS-MnQc56VO'
  });


exports.createPricing= async (req, res) => {

    console.log("Started.....")
    try{
        if(!req.body.title) {
            return res.status(400).send({
                message: "Title can not be empty"
            });
        }
        else {

            var billingPlanAttributes = {  
                "product_id": "PROD-7MV92953T14921018",  
                "name": "Plan1",  
                "description": "new plan by me",  
                "billing_cycles": [  
                  {  
                    "frequency": {  
                        "interval_unit": "MONTH",  
                        "interval_count": 1  
                    },  
                    "tenure_type": "TRIAL",  
                    "sequence": 1,  
                    "total_cycles": 1  
                  },  
                    {  
                      "frequency": {  
                        "interval_unit": "MONTH",  
                        "interval_count": 1  
                      },  
                      "tenure_type": "REGULAR",  
                      "sequence": 2,  
                      "total_cycles": 12,  
                      "pricing_scheme": {  
                        "fixed_price": {  
                          "value": "10",  
                          "currency_code": "USD"  
                        }  
                      }  
                    }  
                  ],  
                "payment_preferences": {  
                  "service_type": "PREPAID",  
                  "auto_bill_outstanding": true,  
                  "setup_fee": {  
                    "value": "10",  
                    "currency_code": "USD"  
                  },  
                  "setup_fee_failure_action": "CONTINUE",  
                  "payment_failure_threshold": 3  
                },  
                "quantity_supported": true,  
                "taxes": {  
                  "percentage": "10",  
                  "inclusive": false  
                }  
            };
            var billingPlanUpdateAttributes = [{
                "op": "replace",
                "path": "/",
                "value": {
                    "state": "ACTIVE"
                }
            }];

            // Create the billing plan
paypal.billingPlan.create(billingPlanAttributes, function (error, billingPlan) {
    if (error) {
        console.log(error);
        throw error;
    } else {
        console.log("Create Billing Plan Response");
        console.log(billingPlan);

        // Activate the plan by changing status to Active
        paypal.billingPlan.update(billingPlan.id, billingPlanUpdateAttributes, function (error, response) {
            if (error) {
                console.log(error);
                throw error;
            } else {
                const pricing = new Pricing({
                    title : req.body.title,
                    isactive:req.body.isactive,
                    description : req.body.description,
                    price:req.body.price,
                    month:req.body.month,
                    plan_id:billingPlan.id
                })
                pricing.save().then(data=>{
                    res.send(
                        { 
                         success:true,
                           message: "Pricing added successfully",
                          "data":data
                      });
                }).catch(err=>{
                    console.log("error"+err)
                    res.status(500).send(err)
                })
            }
        });
    }
});
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            message: error
        });
    }
   }

   
exports.updatePricing= async (req, res) => {
    // Validate request
    if(!req.body.title) {
       return res.status(400).send({
           message: "Pricing can not be empty"
       });
   }
   else {

       await Pricing.findOneAndUpdate({_id:req.params.id},{
            title : req.body.title,
            isactive:req.body.isactive,
            description : req.body.description,
            price:req.body.price,
            month:req.body.month
    }).then(data=>{
        res.status(200).send({
            "message":"Pricing Detail Updated",
            "data": data
        })
    }).catch(ex=>{
        res.status(500).send({
            "message":"Invalid description ID"
        })
    });
    
   }
   }

   exports.getAllPricings= async (req,res)=>{
    try{
        const pricing = await Pricing.find({isactive:true})
        if(!pricing){
            res.status(500).send({
                "message":"There are no Pricings"
            })
        } else {
            res.status(200).send({
                "data": pricing
            })
        }
    }catch(err){
        res.status(500).send(err)
    }
}

exports.getSinglePricing= async (req,res)=>{
    try{
       await Pricing.findOne({ _id: req.params.id}) .then(data=>{
        if(!data){
            res.status(404).send({
                success:false,
                "message":"Pricing not found"
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

exports.deletePricing=async(req,res)=>{
    try{
        //Delete Pricing
      await Pricing.findByIdAndRemove(req.params.id)
        .then(data=>{
            if(!data){
                res.status(404).send({
                    success:false,
                    "message":"Pricing not found"
                })
            } else {
                res.status(200).send({ 
                    success:true,
                    message: "Pricing deleted successfully." });
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
                            message: `Something is wrong with pricing!`
                         });
                              return;
                            }
                        
                        };
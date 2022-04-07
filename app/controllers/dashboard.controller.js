const db = require("../models");
const User =db.User;
const RoleType = db.RoleType;
const PaymentSuscription=db.PaymentSubscription

exports.getAllAthletes = async (req, res, next) => {
    try{
      const roleObject=await RoleType.findOne({name:"Athlete"});
      const users = await User.find({coach_id:null,role:roleObject._id}).sort('-created_at').populate('role')
      .populate('sports') // multiple path names in one requires mongoose >= 3.6
      .exec(function(err, data) {
        res.status(200).json({
          data: data.map(function (value) {
                return {
                  id: value._id,
                  name:value.name,
                  email: value.email,
                  createdAt:value.created_at,
                  username:value.username,
                  age:value.age!=null?value.age:'',
                  role:value.role!=null? {
                    id:value.role.id,
                    name:value.role.name
                  }:null,
                  sports:value.sports? {
                    id:value.sports.id,
                    name:value.sports.name
                  }:null,
                  coach: null,
                  profile_pic:value.profile_pic!=null?value.profile_pic:'',
                  contact:value.contact,
                  gender:value.gender!=null?value.gender:''
              }
        })
         });
      });
    }
    catch(error){
      next(error)
    }
    };


    exports.getAllPayments = async (req, res, next) => {
      try{
        let monthsArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct', 'Nov','Dec'];
        var data=await PaymentSuscription.aggregate([
          { 
            $match: { year: req.params.year!=null?Number(req.params.year):new Date().getFullYear() } 
        },
          { 
              $group: {
                _id: { 
                  month: { $month: "$date" },
              },
                  total_cost_month: { $sum: "$amount" }
              }
          }
          ]);
          console.log(new Date().getFullYear()+""+req.params.year)
          res.status(200).json({data:data.map(function (value) {
            return {
              id: monthsArray[value._id.month-1],
              amount:value.total_cost_month
            }})});
      }
      catch(error){
        next(error)
      }
      };
  
  
  
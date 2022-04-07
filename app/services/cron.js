const db = require('../models')
const PaymentSubscription = db.PaymentSubscription;


exports.checkPackageSubscription=()=>{

    await PaymentSubscription.find({to_date:{$lte:Date.now()}}).then(data=>{

    }).catch(error=>{
        console.log(error);
    })

}
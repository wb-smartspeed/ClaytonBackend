const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var EmailUserSchema  = new Schema({
        name     :   {type: String, required: 'Name is required'},
        user_email     :   {type: String, required: 'Email is required'},
        created_at:      {type: Date,default: Date.now()},
        isread:{type: Boolean,default: false}
      }, {timestamps: true});

module.exports = mongoose.model('EmailUser', EmailUserSchema);
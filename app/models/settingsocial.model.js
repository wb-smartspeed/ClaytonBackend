

const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var SocialMediaSchema  = new Schema({
        facebook     :   {type: String, required: 'facebook cannot be empty.'},
        twitter :   {type: String, required: 'twitter cannot be empty.'},
        linkedin :   {type: String, required: 'linkedin cannot be empty.'},
        instagram :   {type: String, required: 'instagram cannot be empty.'},
        created_at:      {type: Date,default: Date.now()},
      });

module.exports = mongoose.model('SettingSocialMedia', SocialMediaSchema);
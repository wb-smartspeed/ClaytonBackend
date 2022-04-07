const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var HomeTimeLine3Schema  = new Schema({
        title     :   {type: String, required: 'Title cannot be empty'},
        isactive :   { type: Boolean, default: true },
        created_at:      {type: Date,default: Date.now()}
      });

module.exports = mongoose.model('HomeTimeLine3', HomeTimeLine3Schema);
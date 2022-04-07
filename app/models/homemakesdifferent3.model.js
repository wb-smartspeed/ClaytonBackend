const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var HomeMakesDifferent3Schema  = new Schema({
        title     :   {type: String, required: 'Title cannot be empty'},
        isactive :   { type: Boolean, default: true },
        created_at:      {type: Date,default: Date.now()},
        description     :   {type: String}
      });

module.exports = mongoose.model('HomeMakesDifferent3', HomeMakesDifferent3Schema);
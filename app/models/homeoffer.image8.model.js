const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var HomeImage8Schema  = new Schema({
        title     :   {type: String, required: 'Title cannot be empty'},
        isactive :   { type: Boolean, default: true },
        created_at:      {type: Date,default: Date.now()},
        image     :   {type: String}
      });

module.exports = mongoose.model('HomeImage8', HomeImage8Schema);
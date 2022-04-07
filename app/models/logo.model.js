const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var LogoSchema  = new Schema({
        logo     :   {type: String, required: 'logo cannot be empty.'},
        isactive :   { type: Boolean, default: true },
        created_at:      {type: Date,default: Date.now()},
      });

module.exports = mongoose.model('Logo', LogoSchema);
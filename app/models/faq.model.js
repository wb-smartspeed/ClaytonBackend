const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var FAQSchema  = new Schema({
        question     :   {type: String, required: 'Question cannot be empty'},
        isactive :   { type: Boolean, default: true },
        created_at:      {type: Date,default: Date.now()},
        answer     :   {type: String, required: 'Question cannot be empty'}
      });

module.exports = mongoose.model('FAQ', FAQSchema);
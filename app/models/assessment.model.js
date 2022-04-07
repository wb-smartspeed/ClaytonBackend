const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var AssessmentSchema  = new Schema({
        assessment     :   {type: String, required: 'assessment name cannot be empty'},
        type     :   {type: String, required: 'type cannot be empty'},
        isactive :   { type: Boolean, default: true },
        created_at:      {type: Date,default: Date.now()}
      });

module.exports = mongoose.model('Assessment', AssessmentSchema);
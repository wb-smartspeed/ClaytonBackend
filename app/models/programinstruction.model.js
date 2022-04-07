const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var ProgramInstructionSchema  = new Schema({
        title     :   {type: String},
        ischecked :   { type: Boolean, default: false },
        created_at:      {type: Date,default: Date.now()},
        athletes: 
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
            },
            program: 
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "ProgramNew"
            }
      });

module.exports = mongoose.model('ProgramInstruction', ProgramInstructionSchema);
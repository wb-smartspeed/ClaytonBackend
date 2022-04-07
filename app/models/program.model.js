const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var ProgramSchema  = new Schema({
        title     :   {type: String, required: 'role name cannot be empty'},
        isactive :   { type: Boolean, default: true },
        created_at:      {type: Date,default: Date.now()},
        athletes: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
            }
          ],
          instruction : {type: String}
      });

module.exports = mongoose.model('Program', ProgramSchema);
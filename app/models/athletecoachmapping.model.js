const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var AthleteCoachSchema  = new Schema({
        created_at:      {type: Date,default: Date.now()},
         athelete_id:    {
                             type: mongoose.Schema.Types.ObjectId,
                             ref: "User"
                        },
         coach_id:   {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "User"
                       }
      });

module.exports = mongoose.model('AthleteCoachMapping', AthleteCoachSchema);
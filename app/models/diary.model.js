const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var DiarySchema  = new Schema({
        title     :   {type: String, required: 'Title cannot be empty'},
        created_at:      {type: Date,default: Date()},
        athlete_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
      });

module.exports = mongoose.model('Diary', DiarySchema);
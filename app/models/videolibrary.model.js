const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var VideoLibrarySchema  = new Schema({
        title     :   {type: String, required: 'Title cannot be empty'},
        isactive :    { type: Boolean, default: true },
        isadmin :    { type: Boolean, default: false },
        created_at:      {type: Date,default: Date.now()},
        description     :   {type: String},
        thumbnail_image     :   {type: String},
        video_url     :   {type: String},
        athletes: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required:'Athletes cannot be empty'
            }
          ],
      });

module.exports = mongoose.model('VideoLibrary', VideoLibrarySchema);
const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var HomeSliderImageSchema  = new Schema({
        image     :   {type: String, required: 'Image cannot be empty'},
        title     :   {type: String, required: 'Title cannot be empty'},
        isactive :   { type: Boolean, default: true },
        created_at:      {type: Date,default: Date.now()}
      });

module.exports = mongoose.model('HomeSliderImage', HomeSliderImageSchema);
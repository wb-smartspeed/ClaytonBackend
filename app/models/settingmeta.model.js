
const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var MetaTagSchema  = new Schema({
        description     :   {type: String, required: 'logo cannot be empty.'},
        og_title :   {type: String, required: 'Title cannot be empty.'},
        og_description :   {type: String, required: 'OG Description cannot be empty.'},
        og_sitename :   {type: String, required: 'OG Sitename cannot be empty.'},
        created_at:      {type: Date,default: Date.now()},
      });

module.exports = mongoose.model('SettingMetaTag', MetaTagSchema);
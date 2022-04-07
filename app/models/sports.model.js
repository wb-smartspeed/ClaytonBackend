const mongoose = require("mongoose");
Schema = mongoose.Schema;

var SportsTypeSchema  = new Schema({
  created_at:      {type: Date,default: Date.now()},
    active:         {type: Boolean, default: true },
    name:         {type: String, required: 'name cannot be empty.'}
  });

module.exports = mongoose.model('SportsType', SportsTypeSchema);
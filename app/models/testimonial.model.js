const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var TestimonialSchema  = new Schema({
        name     :   {type: String, required: 'Question cannot be empty'},
        isactive :   { type: Boolean, default: true },
        created_at:      {type: Date,default: Date.now()},
        testimonial     :   {type: String},
        image     :   {type: String}
      });

module.exports = mongoose.model('Testimonial', TestimonialSchema);
const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var EmailSchema  = new Schema({
        name     :   {type: String, required: 'Name is required'},
        from     :   {type: String, required: 'Email is required'},
        to     :   {type: String},
        subject :   { type: String, required: 'Subject is required' },
        phone :   { type: String},
        body :   { type: String, required: 'Message is required' },
        created_at:      {type: Date,default: Date.now()},
        is_admin :{ type: Boolean, default: false},
        response :   { type: String},
        unique_email_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "EmailUser",
            default: null
          }
      }, {timestamps: true});

module.exports = mongoose.model('Email', EmailSchema);
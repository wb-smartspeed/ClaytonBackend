const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var ChatMessageUserSchema  = new Schema({
        message :   { type: String, required: 'Message is required' },
        created_at:      {type: Date,default: Date.now()},
        is_admin :      { type: Boolean, default: false},
        unique_message_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChatMessageUser",
            default: null
          },
          user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
      }, {timestamps: true});

module.exports = mongoose.model('ChatMessageUser', ChatMessageUserSchema);
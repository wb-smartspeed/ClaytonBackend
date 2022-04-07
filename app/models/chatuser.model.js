const mongoose = require("mongoose");
Schema = mongoose.Schema;

    // 2. Define the MongoDB schema for the people collection
    var ChatUserSchema  = new Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        isread:{type: Boolean,default: false},
        created_at:      {type: Date,default: Date.now()},
      }, {timestamps: true});

module.exports = mongoose.model('ChatUser', ChatUserSchema);
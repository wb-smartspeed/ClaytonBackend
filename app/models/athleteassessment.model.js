const mongoose = require("mongoose");
Schema = mongoose.Schema;

// 2. Define the MongoDB schema for the people collection
var AthleteAssessmentSchema = new Schema({
    date: { type: Date, required: 'date cannot be empty' },
    speed: { type: Number,default:null},
    jump: { type: Number,default:null},
    time: { type: Number, required: 'time cannot be empty' },
    created_at: { type: Date, default: Date.now() },
    thumbnail_image: { type: String },
    video_url: { type: String },
    assessment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assessment"
    },
    athlete_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('AthleteAssessment', AthleteAssessmentSchema);
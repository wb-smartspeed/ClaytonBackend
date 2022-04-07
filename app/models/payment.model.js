const mongoose = require("mongoose");
Schema = mongoose.Schema;

// 2. Define the MongoDB schema for the people collection
var PricingSchema = new Schema({
    title: { type: String, required: 'title cannot be empty' },
    isactive: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now() },
    description: { type: String },
    price: { type: Number }
});

module.exports = mongoose.model('Pricing', PricingSchema);
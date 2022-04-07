const mongoose = require("mongoose");
Schema = mongoose.Schema;

// 2. Define the MongoDB schema for the people collection
var PaymentSubscriptionSchema = new Schema({
  payment_method: { type: String, required: "payment method cannot be empty" },
  status: { type: String, default: 'Pending' },
  date: { type: Date, default: Date.now() },
  subscription_id: { type: String },
  order_id: { type: String },
  plan_id: { type: String },
  billing_token: { type: String },
  data: { type: Object },
  amount: { type: Number },
  year: { type: Number },
  package_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pricing",
  },
  user_id: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
}, {timestamps: true});

module.exports = mongoose.model(
  "PaymentSubscription",
  PaymentSubscriptionSchema
);


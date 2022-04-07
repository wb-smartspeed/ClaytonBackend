// 1. Include required modules
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcryptjs');

// 2. Define the MongoDB schema for the user collection
var UserSchema = new Schema({
  name: { type: String, required: 'name cannot be empty.' },
  firstname: { type: String, required: 'firstname cannot be empty.' },
  lastname: { type: String, required: 'lastname cannot be empty.' },
  email: { type: String, unique: true, required: 'email invalid' },
  username: { type: String, unique: true, required: 'username invalid' },
  contact: { type: String, default: null },
  password: { type: String, required: 'PasswordInvalid' },
  active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now() },
  age: { type: Number, default: null },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoleType",
    default: null
  },
  sports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "SportsType",
    default: null
  }],
  profile_pic: { type: String },
  biography: { type: String },
  skills: [{ type: String }],
  gender: { type: String },
  coach_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  subscription_id:{type:String},
  level:{type:String},
  aimlevel:{type:String},
  best_suits:{type:String}
  
});

module.exports = mongoose.model('User', UserSchema);
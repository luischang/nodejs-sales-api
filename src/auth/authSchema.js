const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   fullName: { type: String },
   email: { type: String },
   password: { type: String },
   role: { type: String },
   dob:{type: Date, default: Date.now},
   status: { type: Boolean }
},{versionKey:false});
mongoose.model('User', UserSchema,'User');

module.exports = mongoose.model('User');
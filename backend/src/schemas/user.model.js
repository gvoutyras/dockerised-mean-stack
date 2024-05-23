const mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userId: { type: Number },
  role: { type: String },
  fullname: { type: String },
});

userSchema.plugin(AutoIncrement, {
  inc_field: "userId",
});

module.exports = mongoose.model("user", userSchema);

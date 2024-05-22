const mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  id: { type: Number, unique: true },
  description: { type: String, required: false },
  category: { type: String },
});

articleSchema.plugin(AutoIncrement, {
  inc_field: "id",
});

module.exports = mongoose.model("article", articleSchema);

const mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  articleId: { type: Number },
  description: { type: String, required: false },
  category: { type: String },
});

articleSchema.plugin(AutoIncrement, {
  inc_field: "articleId",
});

module.exports = mongoose.model("article", articleSchema);

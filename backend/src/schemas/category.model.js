const mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryId: { type: Number },
});

categorySchema.plugin(AutoIncrement, {
  inc_field: "categoryId",
});

module.exports = mongoose.model("category", categorySchema);

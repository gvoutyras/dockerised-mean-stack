const Category = require("../../../schemas/category.model");

module.exports = {
  newCategory: (req, res) => {
    const { name } = req.body;
    try {
      const category = new Category({ name });
      category.save();

      return res
        .status(201)
        .json({ success: true, message: "Category created" });
    } catch (e) {
      console.log(e); // TODO add logger/filename-line maybe
      return res.status(400).json({ success: false, message: e });
    }
  },
  getCategories: async (req, res) => {
    const { content, filter } = req.query;
    try {
      const data = await Article.find({})
        .select(content ? "" : "-content")
        .select("-__v -_id")
        .exec();

      return res.status(200).json(data);
    } catch (e) {
      console.log(e); // TODO add logger/filename-line maybe
      return res.status(400).json({ success: false, message: e });
    }
  },
  deleteCategory: (req, res) => {},
};

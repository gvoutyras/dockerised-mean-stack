const Category = require("../../../schemas/category.model");

module.exports = {
  newCategory: async (req, res) => {
    const { name } = req.body;
    try {
      const category = new Category({ name });
      await category.save();

      return res
        .status(201)
        .json({ success: true, message: "Category created" });
    } catch (e) {
      console.log(e); // TODO add logger/filename-line maybe
      if (e.code === 11000)
        return res.status(400).json({
          success: false,
          message: `Category with name '${name}' already exists.`,
        });
      return res.status(400).json({ success: false, message: e });
    }
  },
  getCategories: async (req, res) => {
    try {
      const data = await Category.find({}).select("-__v -_id").exec();

      return res.status(200).json(data);
    } catch (e) {
      console.log(e); // TODO add logger/filename-line maybe
      return res.status(400).json({ success: false, message: e });
    }
  },
  deleteCategory: async (req, res) => {
    const { id } = req.params;

    try {
      const filter = isNaN(id)
        ? { title: id }
        : { $or: [{ title: id }, { categoryId: id }] };

      await Category.findOneAndDelete(filter);

      return res
        .status(200)
        .json({ success: true, message: "Category deleted" });
    } catch (e) {
      console.log(e); // TODO add logger/filename-line maybe
      return res.status(400).json({ success: false, message: e });
    }
  },
};

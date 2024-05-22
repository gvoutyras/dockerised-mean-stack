const Article = require("../../../schemas/article.model");

module.exports = {
  createArticle: async (req, res) => {
    const { title, content, description, category } = req.body;
    try {
      const article = new Article({ title, content, description, category });
      await article.save();

      return res
        .status(201)
        .json({ success: true, message: "Article created" });
    } catch (e) {
      console.log(e); // TODO add logger/filename-line maybe
      return res.status(400).json({ success: false, message: e });
    }
  },
  fetchManyArticles: async (req, res) => {
    const { content, filter: filterEntries } = req.query;
    let filterArray;
    if (filterEntries) {
      filterArray = filterEntries.split(",");
    }

    try {
      const filter = filterEntries ? { category: { $in: filterArray } } : {};

      const data = await Article.find(filter)
        .select(content ? "" : "-content")
        .select("-__v -_id")
        .exec();

      return res.status(200).json(data);
    } catch (e) {
      console.log(e); // TODO add logger/filename-line maybe
      return res.status(400).json({ success: false, message: e });
    }
  },
  fetchArticle: async (req, res) => {
    const { id } = req.params;
    const { content } = req.query;

    try {
      const filter = isNaN(id)
        ? { title: id }
        : { $or: [{ title: id }, { articleId: id }] };

      const data = await Article.findOne(filter)
        .select(content ? "" : "-content")
        .select("-__v -_id")
        .exec();

      return res.status(200).json(data);
    } catch (e) {
      console.log(e); // TODO add logger/filename-line maybe
      return res.status(400).json({ success: false, message: e });
    }
  },
  editArticle: async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
      const filter = isNaN(id)
        ? { title: id }
        : { $or: [{ title: id }, { articleId: id }] };

      const update = {
        content: content,
      };
      await Article.findOneAndUpdate(filter, update);

      return res
        .status(200)
        .json({ success: true, message: "Article content updated" });
    } catch (e) {
      console.log(e); // TODO add logger/filename-line maybe
      return res.status(400).json({ success: false, message: e });
    }
  },
  deleteArticle: async (req, res) => {
    const { id } = req.params;

    try {
      const filter = isNaN(id)
        ? { title: id }
        : { $or: [{ title: id }, { articleId: id }] };

      await Article.findOneAndDelete(filter);

      return res
        .status(200)
        .json({ success: true, message: "Article deleted" });
    } catch (e) {
      console.log(e); // TODO add logger/filename-line maybe
      return res.status(400).json({ success: false, message: e });
    }
  },
};

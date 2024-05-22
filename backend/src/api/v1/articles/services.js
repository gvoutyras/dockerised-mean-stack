const Article = require("../../../schemas/article.model");

module.exports = {
  createArticle: (req, res) => {
    const { title, content, description, category } = req.body;
    try {
      const article = new Article({ title, content, description, category });
      article.save();

      return res
        .status(201)
        .json({ success: true, message: "Article created" });
    } catch (e) {
      console.log(e); // TODO add logger/filename-line maybe
      return res.status(400).json({ success: false, message: e });
    }
  },
  fetchManyArticles: async (req, res) => {
    const { content, filter } = req.query;
    let filterArray;
    if (filter) {
      filterArray = filter.split(",");
    }

    try {
      let data = await Article.find(
        filter ? { category: { $in: filterArray } } : {}
      )
        .select(content ? "" : "-content")
        .select("-__v -_id")
        .exec();

      return res.status(200).json(data);
    } catch (e) {
      console.log(e); // TODO add logger/filename-line maybe
      return res.status(400).json({ success: false, message: e });
    }
  },
  fetchArticle: (req, res) => {},
  editArticle: (req, res) => {},
  deleteArticle: (req, res) => {},
};

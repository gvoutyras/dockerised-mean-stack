export class Article {
  title: String;
  content?: String;
  description: String;
  category: String;
  articleId: Number;

  constructor(model?: any) {
    Object.assign(this, model);
  }
}

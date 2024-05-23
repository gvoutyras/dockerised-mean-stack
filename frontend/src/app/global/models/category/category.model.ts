export class Article {
  name: String;
  categoryId: Number;

  constructor(model?: any) {
    Object.assign(this, model);
  }
}

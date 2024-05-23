export class Category {
  name: String;
  categoryId: Number;

  constructor(model?: any) {
    Object.assign(this, model);
  }
}

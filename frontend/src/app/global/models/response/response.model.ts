export class ServerReponse {
  success: String;
  message?: String;

  constructor(model?: any) {
    Object.assign(this, model);
  }
}

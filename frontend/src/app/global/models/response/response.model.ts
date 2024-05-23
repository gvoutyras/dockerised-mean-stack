export class ServerReponse {
  success: String;
  message?: String;
  token?: String;

  constructor(model?: any) {
    Object.assign(this, model);
  }
}

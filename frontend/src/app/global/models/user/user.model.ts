import { UserRoles } from '../enums/user.enum';

export class UserItem {
  username: String;
  password?: String;
  role?: UserRoles;
  userId?: Number;
  fullname?: String;

  constructor(model?: any) {
    Object.assign(this, model);
  }
}

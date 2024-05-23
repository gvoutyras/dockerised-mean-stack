import { Injectable } from '@angular/core';
import { UserRoles } from '../models/enums/user.enum';
import { UserItem } from '../models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor() {}

  public isAdmin(role: string): boolean {
    return role === UserRoles.ADMIN;
  }
}

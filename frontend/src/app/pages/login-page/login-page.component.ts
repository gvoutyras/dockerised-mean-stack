import { LocalStorageService } from './../../global/services/local-storage.service';
import { UserService } from './../../global/services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { UserItem } from '../../global/models/user/user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  public loginFail = false;
  public username: String;
  public password: String;

  constructor(
    private router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {}

  public onClick() {
    this.initLogin();
    // console.log('Login');
    // this.router.navigate(['home']);
  }

  async initLogin() {
    const res = await firstValueFrom(
      this.userService.login({
        username: this.username,
        password: this.password,
      })
    );

    if (res.success) {
      const decodedUser: UserItem = jwtDecode(res.token as string);
      this.localStorageService.setLocalStorage(
        'role',
        decodedUser.role as string
      );
      this.localStorageService.setLocalStorage('jwt', res.token as string);
      this.localStorageService.setLocalStorage(
        'fullname',
        decodedUser.fullname as string
      );

      this.router.navigate(['/home']);
    } else {
      this.loginFail = true;
    }
  }
}

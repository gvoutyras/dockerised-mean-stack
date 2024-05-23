import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { NavigationSingletonService } from '../services/navigation-singleton.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  items: any;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private navigationService: NavigationSingletonService
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Menu',
        items: [
          {
            label: 'Articles',
            icon: 'pi pi-book',
            command: () =>
              this.navigationService.sendMessage({
                articles: true,
                categories: false,
              }),
          },
          {
            label: 'Categories',
            icon: 'pi pi-list',
            command: () =>
              this.navigationService.sendMessage({
                articles: false,
                categories: true,
              }),
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => this.logout(),
          },
        ],
      },
    ];
  }

  logout() {
    this.localStorageService.deleteLocalStorage('jwt');
    this.localStorageService.deleteLocalStorage('role');
    this.localStorageService.deleteLocalStorage('fullname');
    this.router.navigate(['']);
  }
}

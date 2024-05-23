import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  items: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Menu',
        items: [
          {
            label: 'Articles',
            icon: 'pi pi-book',
            command: () => console.log('Must change view to articles'),
          },
          {
            label: 'Categories',
            icon: 'pi pi-list',
            command: () => console.log('Must change view to categories'),
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
          },
        ],
      },
    ];
  }
}

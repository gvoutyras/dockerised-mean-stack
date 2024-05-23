import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  public fullname;
  public role;

  constructor(private localStorageService: LocalStorageService) {
    this.fullname = this.localStorageService.getLocalStorage('fullname');
    this.role = this.localStorageService.getLocalStorage('role').toUpperCase();
  }
}

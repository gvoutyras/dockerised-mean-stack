import { Component } from '@angular/core';
import { NavigationSingletonService } from '../../global/services/navigation-singleton.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  subscription: Subscription;
  message: object;
  activeComp = { articles: true, categories: false };

  constructor(private navigationService: NavigationSingletonService) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.navigationService
      .getMessage()
      .subscribe((message) => {
        this.activeComp = message;
      });
  }
}

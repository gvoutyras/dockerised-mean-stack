import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { ImageModule } from 'primeng/image';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './global/navbar/navbar.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { MenuProfileImageComponent } from './global/menu-profile-image/menu-profile-image.component';
import { SidebarComponent } from './global/components/sidebar/sidebar.component';
import { NavigationSingletonService } from './global/services/navigation-singleton.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    NavbarComponent,
    ArticlesComponent,
    CategoriesComponent,
    MenuProfileImageComponent,
    SidebarComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
    MenubarModule,
    SidebarModule,
    TableModule,
    MenuModule,
    BadgeModule,
    RippleModule,
    AvatarModule,
    ImageModule,
  ],
  providers: [NavigationSingletonService],
  bootstrap: [AppComponent],
})
export class AppModule {}

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
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './global/navbar/navbar.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { MenuProfileImageComponent } from './global/menu-profile-image/menu-profile-image.component';
import { SidebarComponent } from './global/components/sidebar/sidebar.component';
import { NavigationSingletonService } from './global/services/navigation-singleton.service';
import { ArticleModalComponent } from './global/components/article-modal/article-modal.component';
import { ArticleModalSingletonService } from './global/services/article-modal-singleton.service';
import { ReadOnlyTextComponent } from './global/components/read-only-text/read-only-text.component';
import { EditTextComponent } from './global/components/edit-text/edit-text.component';
import { CreateCategoryModalComponent } from './global/components/create-category-modal/create-category-modal.component';

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
    ArticleModalComponent,
    ReadOnlyTextComponent,
    EditTextComponent,
    CreateCategoryModalComponent,
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
    DialogModule,
    InputTextareaModule,
  ],
  providers: [NavigationSingletonService, ArticleModalSingletonService],
  bootstrap: [AppComponent],
})
export class AppModule {}

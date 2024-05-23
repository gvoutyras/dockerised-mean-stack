import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Article } from '../../global/models/article/article.model';
import { ArticleService } from '../../global/services/article.service';
import { LocalStorageService } from '../../global/services/local-storage.service';
import { RolesService } from '../../global/services/roles.service';
import { CategoryService } from '../../global/services/category.service';
import { Category } from '../../global/models/category/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  public showActions: boolean;
  categories!: Category[];

  constructor(
    private categoryService: CategoryService,
    private localStorageService: LocalStorageService,
    private rolesService: RolesService
  ) {}

  ngOnInit() {
    this.initArticles();

    const role = this.localStorageService.getLocalStorage('role');
    if (this.rolesService.isAdmin(role as string)) {
      this.showActions = true;
    }
  }

  async initArticles() {
    this.categories = await firstValueFrom(
      this.categoryService.getCategories()
    );
  }

  public async deleteCategory(id: any) {
    await firstValueFrom(await this.categoryService.deleteCategory(id));
    this.categories = this.categories.filter((el) => el.categoryId !== id);
  }
}

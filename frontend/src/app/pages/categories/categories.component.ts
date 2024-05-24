import { RefreshCategoriesSingletonService } from './../../global/services/refresh-categories-singleton.service';
import { Component } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
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
  public categoryModal = false;
  categories!: Category[];
  refreshCategorySubscription: Subscription;

  constructor(
    private categoryService: CategoryService,
    private localStorageService: LocalStorageService,
    private rolesService: RolesService,
    private refreshCategoriesSingletonService: RefreshCategoriesSingletonService
  ) {}

  ngOnInit() {
    this.initCategories();

    const role = this.localStorageService.getLocalStorage('role');
    if (this.rolesService.isAdmin(role as string)) {
      this.showActions = true;
    }

    this.refreshCategorySubscription = this.refreshCategoriesSingletonService
      .getMessage()
      .subscribe((message) => {
        if (message.refresh) {
          this.initCategories();
          this.categoryModal = false;
        }
      });
  }

  async initCategories() {
    this.categories = await firstValueFrom(
      this.categoryService.getCategories()
    );
  }

  public async deleteCategory(id: any) {
    await firstValueFrom(await this.categoryService.deleteCategory(id));
    this.categories = this.categories.filter((el) => el.categoryId !== id);
  }

  public createCategory() {
    this.categoryModal = true;
  }
}

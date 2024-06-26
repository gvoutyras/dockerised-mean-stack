import { RefreshCategoriesSingletonService } from './../../services/refresh-categories-singleton.service';
import { CategoryService } from './../../services/category.service';
import { lastValueFrom } from 'rxjs';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrl: './create-category-modal.component.css',
})
export class CreateCategoryModalComponent {
  @Input() visible: boolean = false;
  public catName: String;
  public errorMessage: String;

  constructor(
    private categoryService: CategoryService,
    private refreshCategoriesSingletonService: RefreshCategoriesSingletonService
  ) {}

  showDialog() {
    this.visible = true;
  }

  async addCategory() {
    try {
      await lastValueFrom(this.categoryService.createCategory(this.catName));
    } catch (e: any) {
      this.errorMessage = e.error.message;
    } finally {
      this.visible = false;
      this.refreshCategoriesSingletonService.sendMessage({ refresh: true });
      this.catName = '';
    }
  }
}

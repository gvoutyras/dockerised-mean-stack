import { Component } from '@angular/core';
import { Category } from '../../models/category/category.model';
import { firstValueFrom } from 'rxjs';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories-dropdown',
  templateUrl: './categories-dropdown.component.html',
  styleUrl: './categories-dropdown.component.css',
})
export class CategoriesDropdownComponent {
  categories: Category[];

  selectedCategory: Category | undefined;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.fetchCategories();
  }

  async fetchCategories() {
    this.categories = await firstValueFrom(
      this.categoryService.getCategories()
    );
    this.selectedCategory = this.categories[0];
  }
}

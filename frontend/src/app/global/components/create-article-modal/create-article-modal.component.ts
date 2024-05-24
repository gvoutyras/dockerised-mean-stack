import { RefreshArticlesSingletonService } from './../../services/refresh-articles-singleton.service';
import { Component, Input, ViewChild } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { lastValueFrom } from 'rxjs';
import { Article } from '../../models/article/article.model';
import { CategoriesDropdownComponent } from '../categories-dropdown/categories-dropdown.component';

@Component({
  selector: 'app-create-article-modal',
  templateUrl: './create-article-modal.component.html',
  styleUrl: './create-article-modal.component.css',
})
export class CreateArticleModalComponent {
  @Input() visible: boolean = false;
  public article: Omit<Article, 'articleId'> = {
    title: '',
    category: '',
    description: '',
    content: '',
  };
  public description: String;
  public content: String;
  public refresh = false;

  constructor(
    private articleService: ArticleService,
    private refreshArticlesSingletonService: RefreshArticlesSingletonService
  ) {}

  showDialog() {
    this.visible = true;
  }

  @ViewChild(CategoriesDropdownComponent) category: {
    selectedCategory: {
      name: String;
    };
  };
  async createArticle() {
    const data = this.article;
    data.category = this.category.selectedCategory.name;

    try {
      await lastValueFrom(this.articleService.createArticle(data as Article));
    } catch (e: any) {
      console.log(e);
    } finally {
      this.visible = false;
      this.refresh = true;
      this.refreshArticlesSingletonService.sendMessage({ refresh: true });
      this.article = {
        title: '',
        category: '',
        description: '',
        content: '',
      };
    }
  }
}

import { Component } from '@angular/core';
import { ArticleService } from '../../global/services/article.service';
import { Article } from '../../global/models/article/article.model';
import { firstValueFrom } from 'rxjs';
import { LocalStorageService } from '../../global/services/local-storage.service';
import { RolesService } from '../../global/services/roles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent {
  public showActions: boolean;
  private clickedDelete = false;
  articles!: Article[];

  constructor(
    private articleService: ArticleService,
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
    this.articles = await firstValueFrom(
      this.articleService.fetchManyArticles()
    );
  }

  public async deleteArticle(id: any) {
    this.clickedDelete = true;
    await firstValueFrom(await this.articleService.deleteArticle(id));
    this.articles = this.articles.filter((el) => el.articleId !== id);
  }

  public async openArticle(id: String) {
    if (this.clickedDelete) {
      this.clickedDelete = false;
      return;
    }
    let articleToRender;
    const localArticle: Article = this.articles.filter(
      (el) => el.articleId == +id
    )[0];
    if (localArticle?.content) {
      // render this
      articleToRender = localArticle;
    } else {
      // render that
      articleToRender = await firstValueFrom(
        this.articleService.fetchArticle(id, true)
      );
    }
    console.log(articleToRender);
  }
}

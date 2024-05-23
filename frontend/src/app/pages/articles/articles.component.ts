import { Component } from '@angular/core';
import { ArticleService } from '../../global/services/article.service';
import { Article } from '../../global/models/article/article.model';
import { firstValueFrom } from 'rxjs';
import { LocalStorageService } from '../../global/services/local-storage.service';
import { RolesService } from '../../global/services/roles.service';
import { ArticleModalSingletonService } from '../../global/services/article-modal-singleton.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent {
  public showActions: boolean;
  public showModal: boolean;
  private clickedDelete = false;
  private clickedEdit = false;
  articles!: Article[];

  constructor(
    private articleService: ArticleService,
    private localStorageService: LocalStorageService,
    private rolesService: RolesService,
    private articleModalSingletonService: ArticleModalSingletonService
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

  public async editArticle(id: String, content: String) {
    // open new modal i guess
    // await firstValueFrom(await this.articleService.editArticle(id, content));
  }

  public async openEditModal(id: String) {
    this.clickedEdit = true;
    const article = await this.getArticle(id);
    if (article) this.articleModalSingletonService.sendMessage(article, true);
    else console.log('No article!');
  }

  public async openArticle(id: String) {
    if (this.clickedEdit) {
      this.clickedEdit = false;
      return;
    }
    const article = await this.getArticle(id);
    if (article) this.articleModalSingletonService.sendMessage(article, false);
    else console.log('No article!');
  }

  private async getArticle(id: String) {
    if (this.clickedDelete) {
      this.clickedDelete = false;
      return;
    }
    let articleToReturn;
    const localArticle: Article = this.articles.filter(
      (el) => el.articleId == +id
    )[0];
    if (localArticle?.content) {
      // render this
      articleToReturn = localArticle;
    } else {
      // render that
      articleToReturn = await firstValueFrom(
        this.articleService.fetchArticle(id, true)
      );
    }
    return articleToReturn;
  }
}

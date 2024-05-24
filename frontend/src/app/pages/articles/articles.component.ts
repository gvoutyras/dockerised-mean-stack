import { RefreshArticlesSingletonService } from './../../global/services/refresh-articles-singleton.service';
import { Component, ViewChild } from '@angular/core';
import { ArticleService } from '../../global/services/article.service';
import { Article } from '../../global/models/article/article.model';
import { firstValueFrom, Subscription } from 'rxjs';
import { LocalStorageService } from '../../global/services/local-storage.service';
import { RolesService } from '../../global/services/roles.service';
import { ArticleModalSingletonService } from '../../global/services/article-modal-singleton.service';
import { CreateArticleModalComponent } from '../../global/components/create-article-modal/create-article-modal.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent {
  public showActions: boolean;
  public showModal = false;
  public createArticleModal = false;
  // private clickedDelete = false;
  // private clickedEdit = false;
  articles!: Article[];
  refreshSubscription: Subscription;

  constructor(
    private articleService: ArticleService,
    private localStorageService: LocalStorageService,
    private rolesService: RolesService,
    private articleModalSingletonService: ArticleModalSingletonService,
    private refreshArticlesSingletonService: RefreshArticlesSingletonService
  ) {}

  ngOnInit() {
    this.initArticles();

    const role = this.localStorageService.getLocalStorage('role');
    if (this.rolesService.isAdmin(role as string)) {
      this.showActions = true;
    }

    this.refreshSubscription = this.refreshArticlesSingletonService
      .getMessage()
      .subscribe((message) => {
        if (message.refresh) {
          this.initArticles();
          this.createArticleModal = false;
        }
      });
  }

  ngOnDestroy() {
    this.refreshSubscription.unsubscribe();
  }

  async initArticles() {
    this.articles = await firstValueFrom(
      this.articleService.fetchManyArticles()
    );
  }

  public async deleteArticle(id: any) {
    // this.clickedDelete = true;
    await firstValueFrom(await this.articleService.deleteArticle(id));
    this.articles = this.articles.filter((el) => el.articleId !== id);
  }

  public async openEditModal(id: String) {
    // this.clickedEdit = true;
    this.showModal = true;
    const article = await this.getArticle(id);
    if (article) this.articleModalSingletonService.sendMessage(article, true);
    else console.log('No article!');
  }

  public async openArticle(id: String) {
    // if (this.clickedDelete) {
    //   this.clickedDelete = false;
    //   return;
    // }
    this.showModal = true;
    // if (this.clickedEdit) {
    //   this.clickedEdit = false;
    //   return;
    // }
    const article = await this.getArticle(id);
    if (article) this.articleModalSingletonService.sendMessage(article, false);
    else console.log('No article!');
  }

  public createArticle() {
    this.createArticleModal = true;
  }

  private async getArticle(id: String) {
    // if (this.clickedDelete) {
    //   this.clickedDelete = false;
    //   return;
    // }
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

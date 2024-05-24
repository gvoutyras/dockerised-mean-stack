import { ArticleModalSingletonService } from './../../services/article-modal-singleton.service';
import { Component, ViewChild } from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { Article } from '../../models/article/article.model';
import { EditTextComponent } from '../edit-text/edit-text.component';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrl: './article-modal.component.css',
})
export class ArticleModalComponent {
  subscription: Subscription;
  article: Article & { content: String };
  isEdit: boolean;
  visible: boolean;

  constructor(
    private articleModalSingletonService: ArticleModalSingletonService,
    private articleService: ArticleService
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.articleModalSingletonService
      .getMessage()
      .subscribe((message) => {
        this.visible = true;
        this.isEdit = message.isEdit;
        this.article = message.article;
      });
  }

  @ViewChild(EditTextComponent) childArticle: { text: String };
  async saveEditedArticle() {
    await lastValueFrom(
      this.articleService.editArticle(
        this.article.articleId.toString(),
        this.childArticle.text
      )
    );
    this.visible = false;
  }
}

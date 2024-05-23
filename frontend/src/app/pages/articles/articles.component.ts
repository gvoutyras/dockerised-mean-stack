import { Component } from '@angular/core';
import { ArticleService } from '../../global/services/article.service';
import { Article } from '../../global/models/article/article.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent {
  articles!: Article[];

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    console.log('Init articles');
    this.initArticles();
  }

  async initArticles() {
    this.articles = await firstValueFrom(
      this.articleService.fetchManyArticles()
    );
  }
}

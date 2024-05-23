import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Article } from '../models/article/article.model';
import { ServerReponse } from '../models/response/response.model';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private hostURl: String;

  constructor(private http: HttpClient) {
    this.hostURl = environment.host;
  }

  public createArticle(data: Article): Observable<ServerReponse> {
    return this.http
      .post<ServerReponse>(`${this.hostURl}/api/v1/articles/new`, data)
      .pipe(map((result) => new ServerReponse(result)));
  }

  public fetchManyArticles(
    content?: Boolean,
    filter?: String[]
  ): Observable<Article[]> {
    const filterString =
      filter &&
      filter.reduce((acc: String, el) => {
        if (!acc) acc = '';
        acc += `${el},`;

        return acc;
      });

    return this.http
      .get<ServerReponse>(
        `${this.hostURl}/api/v1/articles/fetchMany${
          content ? `/content=true` : ''
        }/${filter?.length ? filterString : ''}`
      )
      .pipe(map((result) => _.map(result, (t: any) => new Article(t))));
  }

  public fetchArticle(id: String, content?: Boolean) {
    return this.http
      .get<ServerReponse>(
        `${this.hostURl}/api/v1/articles/${id}${content ? `/content=true` : ''}`
      )
      .pipe(map((result) => new Article(result)));
  }

  public editArticle(id: String, content: String) {
    return this.http
      .post<ServerReponse>(`${this.hostURl}/api/v1/articles/${id}`, content)
      .pipe(map((result) => new ServerReponse(result)));
  }

  public deleteArticle(id: String) {
    return this.http
      .delete<ServerReponse>(`${this.hostURl}/api/v1/articles/${id}`)
      .pipe(map((result) => new ServerReponse(result)));
  }
}

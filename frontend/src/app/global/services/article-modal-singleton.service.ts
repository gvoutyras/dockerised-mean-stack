import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Article } from '../models/article/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleModalSingletonService {
  private subject = new Subject<any>();

  sendMessage(message: Article, isEdit: boolean) {
    this.subject.next({ article: message, isEdit });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}

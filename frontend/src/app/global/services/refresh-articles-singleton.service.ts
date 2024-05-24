import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RefreshArticlesSingletonService {
  private subject = new Subject<any>();

  sendMessage(message: object) {
    console.log('send refresh');
    this.subject.next(message);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}

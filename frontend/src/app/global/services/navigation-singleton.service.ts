import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationSingletonService {
  private subject = new Subject<any>();

  sendMessage(message: object) {
    this.subject.next(message);
  }

  // clearMessage() {
  //   this.subject.next();
  // }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { UserItem } from '../models/user/user.model';
import { Observable } from 'rxjs';
import { ServerReponse } from '../models/response/response.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private hostURl: String;

  constructor(private http: HttpClient) {
    this.hostURl = environment.host;
  }

  public login(data: UserItem): Observable<ServerReponse> {
    return this.http
      .post<ServerReponse>(`${this.hostURl}/api/v1/user/login`, data)
      .pipe(map((result) => new ServerReponse(result)));
  }
}

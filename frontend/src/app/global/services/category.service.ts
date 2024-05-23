import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ServerReponse } from '../models/response/response.model';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CategoryServiceService {
  private hostURl: String;

  constructor(private http: HttpClient) {
    this.hostURl = environment.host;
  }

  public createCategory(name: String): Observable<ServerReponse> {
    return this.http
      .post<ServerReponse>(`${this.hostURl}/api/v1/categories/new`, name)
      .pipe(map((result) => new ServerReponse(result)));
  }

  public getCategories(): Observable<ServerReponse> {
    return this.http
      .get<ServerReponse>(`${this.hostURl}/api/v1/categories/`)
      .pipe(map((result) => new ServerReponse(result)));
  }

  public deleteCategory(id: String): Observable<ServerReponse> {
    return this.http
      .delete<ServerReponse>(`${this.hostURl}/api/v1/categories/${id}`)
      .pipe(map((result) => new ServerReponse(result)));
  }
}

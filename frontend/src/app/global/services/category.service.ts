import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ServerReponse } from '../models/response/response.model';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { HeadersService } from './headers.service';
import { Category } from '../models/category/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private hostURl: String;

  constructor(
    private http: HttpClient,
    private headersService: HeadersService
  ) {
    this.hostURl = environment.host;
  }

  public createCategory(name: String): Observable<ServerReponse> {
    return this.http
      .post<ServerReponse>(`${this.hostURl}/api/v1/categories/new`, name, {
        headers: this.headersService.setupHeaders(),
      })
      .pipe(map((result) => new ServerReponse(result)));
  }

  public getCategories(): Observable<Category[]> {
    return this.http
      .get<Category>(`${this.hostURl}/api/v1/categories/`, {
        headers: this.headersService.setupHeaders(),
      })
      .pipe(map((result) => _.map(result, (t: any) => new Category(t))));
  }

  public deleteCategory(id: String): Observable<ServerReponse> {
    return this.http
      .delete<ServerReponse>(`${this.hostURl}/api/v1/categories/${id}`, {
        headers: this.headersService.setupHeaders(),
      })
      .pipe(map((result) => new ServerReponse(result)));
  }
}

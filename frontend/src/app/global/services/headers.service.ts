import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HeadersService {
  constructor(private localStorageService: LocalStorageService) {}

  public setupHeaders() {
    const headerDict: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.localStorageService.getLocalStorage(
        'jwt'
      )}`,
    });

    return headerDict;
  }
}

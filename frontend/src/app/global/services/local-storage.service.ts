import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public setLocalStorage(key: String, value: String): void {
    localStorage.setItem(key as string, value as string);
  }

  public getLocalStorage(key: String): String {
    return localStorage.getItem(key as string) as String;
  }

  public deleteLocalStorage(key: String): void {
    localStorage.removeItem(key as string);
  }
}

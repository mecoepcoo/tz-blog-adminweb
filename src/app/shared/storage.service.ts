import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() { }

  token: string = this.get('token');

  get(key) {
    let data: any = localStorage.getItem(key);
    if (!data) {
      return '';
    }
    let storageData = JSON.parse(data);
    if (data.exp < new Date().getTime()) {
      this.remove(key);
      return '';
    }
    return storageData.data;
  }

  set(key, data, exp = 2592000000) {
    let toStorage = JSON.stringify({ data: data, exp: new Date().getTime() + exp });
    localStorage.setItem(key, toStorage);
  }

  remove(key) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  getAll() {
    return localStorage;
  }
}
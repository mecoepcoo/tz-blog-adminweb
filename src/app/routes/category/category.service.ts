import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ICategory } from '@interfaces/category';
import { IResponse } from '@interfaces/response';
import { Config } from '@config/config';

@Injectable()
export class CategoryService {
  constructor(
    private http: HttpClient,
  ) { }

  /* 获取分类列表 */
  getCategoryList(page = 1, size = 10): Observable<IResponse> {
    let url = `${Config.apiUrl}categories?page=${page}&size=${size}`;
    return this.http.get(url);
  }
}
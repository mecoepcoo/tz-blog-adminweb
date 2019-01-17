import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ICategory } from '@interfaces/category';
import { IResponse } from '@interfaces/response';
import { Config } from '@config/config';

@Injectable()
export class PostService {
  constructor(
    private http: HttpClient,
  ) { }

  /* 获取分类列表 */
  getCategoryList(page = 1, size = 10): Observable<IResponse> {
    let url = `${Config.apiUrl}categories?page=${page}&size=${size}`;
    return this.http.get(url);
  }

  /* 获取分类 */
  getCategory(id: number | string): Observable<IResponse> {
    let url = `${Config.apiUrl}categories/${id}`;
    return this.http.get(url);
  }

  /* 新增分类 */
  addCategory(name): Observable<IResponse> {
    let url = `${Config.apiUrl}categories`;
    return this.http.post(url, {
      name: name,
    });
  }

  /* 修改分类 */
  editCategory(id, name): Observable<IResponse> {
    let url = `${Config.apiUrl}categories/${id}`;
    return this.http.put(url, {
      name: name,
    });
  }

  /* 删除分类 */
  delCategory(id): Observable<IResponse> {
    let url = `${Config.apiUrl}categories/${id}`;
    return this.http.delete(url);
  }
}
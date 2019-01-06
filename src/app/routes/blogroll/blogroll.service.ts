import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IBlogroll } from '@interfaces/blogroll';
import { IResponse } from '@interfaces/response';
import { Config } from '@config/config';

@Injectable()
export class BlogrollService {
  constructor(
    private http: HttpClient,
  ) { }

  /* 获取友链列表 */
  getBlogrollList(page = 1, size = 10): Observable<IResponse> {
    let url = `${Config.apiUrl}blogrolls?page=${page}&size=${size}`;
    return this.http.get(url);
  }

  /* 获取友链 */
  getBlogroll(id: number | string): Observable<IResponse> {
    let url = `${Config.apiUrl}blogrolls/${id}`;
    return this.http.get(url);
  }

  /* 新增友链 */
  addBlogroll(name, path): Observable<IResponse> {
    let url = `${Config.apiUrl}blogrolls`;
    return this.http.post(url, {
      name: name,
      url: path,
    });
  }

  /* 修改友链 */
  editBlogroll(id, name, path): Observable<IResponse> {
    let url = `${Config.apiUrl}blogrolls/${id}`;
    return this.http.put(url, {
      name: name,
      url: path,
    });
  }

  /* 删除友链 */
  delBlogroll(id): Observable<IResponse> {
    let url = `${Config.apiUrl}blogrolls/${id}`;
    return this.http.delete(url);
  }
}
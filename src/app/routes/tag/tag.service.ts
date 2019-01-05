import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ICategory } from '@interfaces/category';
import { IResponse } from '@interfaces/response';
import { Config } from '@config/config';

@Injectable()
export class TagService {
  constructor(
    private http: HttpClient,
  ) { }

  /* 获取标签列表 */
  getTagList(page = 1, size = 10): Observable<IResponse> {
    let url = `${Config.apiUrl}tags?page=${page}&size=${size}`;
    return this.http.get(url);
  }

  /* 获取标签 */
  getTag(id: number | string): Observable<IResponse> {
    let url = `${Config.apiUrl}tags/${id}`;
    return this.http.get(url);
  }

  /* 新增标签 */
  addTag(name): Observable<IResponse> {
    let url = `${Config.apiUrl}tags`;
    return this.http.post(url, {
      name: name,
    });
  }

  /* 修改标签 */
  editTag(id, name): Observable<IResponse> {
    let url = `${Config.apiUrl}tags/${id}`;
    return this.http.put(url, {
      name: name,
    });
  }

  /* 删除标签 */
  delTag(id): Observable<IResponse> {
    let url = `${Config.apiUrl}tags/${id}`;
    return this.http.delete(url);
  }
}
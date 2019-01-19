import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IPost } from '@interfaces/post';
import { IResponse } from '@interfaces/response';
import { Config } from '@config/config';

@Injectable()
export class PostService {
  constructor(
    private http: HttpClient,
  ) { }

  /* 获取文章列表 */
  getPostList(page = 1, size = 10): Observable<IResponse> {
    let url = `${Config.apiUrl}posts?page=${page}&size=${size}`;
    return this.http.get(url);
  }

  /* 获取文章 */
  getPost(id: number | string): Observable<IResponse> {
    let url = `${Config.apiUrl}posts/${id}`;
    return this.http.get(url);
  }

  /* 新增文章 */
  addPost(post): Observable<IResponse> {
    let url = `${Config.apiUrl}posts`;
    return this.http.post(url, {
      post,
    });
  }

  /* 修改文章 */
  editPost(id, post): Observable<IResponse> {
    let url = `${Config.apiUrl}posts/${id}`;
    return this.http.put(url, {
      post,
    });
  }

  /* 删除文章 */
  delPost(id): Observable<IResponse> {
    let url = `${Config.apiUrl}posts/${id}`;
    return this.http.delete(url);
  }
}
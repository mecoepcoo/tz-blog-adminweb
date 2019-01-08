import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IAuser } from '@interfaces/auser';
import { IResponse } from '@interfaces/response';
import { Config } from '@config/config';

@Injectable()
export class AuserService {
  constructor(
    private http: HttpClient,
  ) { }

  /* 获取管理员列表 */
  getAuserList(page = 1, size = 10): Observable<IResponse> {
    let url = `${Config.apiUrl}ausers?page=${page}&size=${size}`;
    return this.http.get(url);
  }

  /* 获取管理员分类 */
  getAuser(id: number | string): Observable<IResponse> {
    let url = `${Config.apiUrl}ausers/${id}`;
    return this.http.get(url);
  }

  /* 新增管理员 */
  addAuser(name): Observable<IResponse> {
    let url = `${Config.apiUrl}ausers`;
    return this.http.post(url, {
      name: name,
    });
  }

  /* 修改管理员密码 */
  editPwd(id, name): Observable<IResponse> {
    let url = `${Config.apiUrl}ausers/${id}`;
    return this.http.put(url, {
      name: name,
    });
  }

  /* 删除管理员 */
  delAuser(id): Observable<IResponse> {
    let url = `${Config.apiUrl}ausers/${id}`;
    return this.http.delete(url);
  }
}
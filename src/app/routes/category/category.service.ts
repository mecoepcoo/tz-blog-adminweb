import {Injectable} from '@angular/core';
import { ICategory } from '@interfaces/category';

@Injectable()
export class CategoryService {
  constructor() {
    
  }

  /* 获取分类列表 */
  getCategoryList(page = 1, size = 10): Observable<HttpResponse<ICategory>> {
    
  }
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema, SFSchemaEnumType } from '@delon/form';
import { map } from 'rxjs/operators'
import { Router } from "@angular/router";

import { PostService } from '../../post.service';
import { CategoryService } from '../../../category/category.service';
import { TagService } from '../../../tag/tag.service';

@Component({
  selector: 'app-post-list-add',
  templateUrl: './add.component.html',
  providers: [
    CategoryService,
    TagService,
  ],
})
export class PostListAddComponent implements OnInit {
  addSchema: SFSchema = {
    properties: {
      title: {
        type: 'string',
        title: '标题',
      },
      author: {
        type: 'string',
        title: '作者',
        default: 'Tianzhen',
      },
      order: {
        type: 'number',
        title: '排序',
        default: '0',
      },
      category: {
        type: 'string',
        title: '分类',
        // enum: this.categoriesList,
      },
      tags: {
        type: 'string',
        title: '标签',
      },
      content: {
        type: 'string',
        title: '正文',
      },
    },
    required: ['title', 'author', 'category', 'tags', 'order'],
  };

  ui: SFUISchema = {
    '*': {
      spanLabel: 2,
      spanControl: 22,
    },
    $title: {
      widget: 'string',
    },
    $author: {
      widget: 'string',
    },
    $order: {
      widget: 'number',
    },
    $category: {
      widget: 'select',
      asyncData: () => this.getCategories(),
    },
    $tags: {
      widget: 'tag',
      asyncData: () => this.getTags(),
    },
    $content: {
      widget: 'md',
    }
  };
  
  constructor(
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private _postService: PostService,
    private _categoryService: CategoryService,
    private _tagService: TagService,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  save(value: any) {
    let { title, author, order, category, tags, content } = value;
    tags = JSON.stringify(tags);
    content = content.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>').replace(/\s/g, ' ');
    this._postService.addPost(title, author, content, order, category, tags)
      .subscribe(res => {
        this.msgSrv.success('新建成功');
        this.router.navigate(['/post/list']);
      }, err => {
        this.msgSrv.error('新建失败');
      });
  }

  getCategories() {
    return this._categoryService.getCategoryList(1, 200)
      .pipe(
        map(data => {
          let categories = data.data.rows;
          let categoriesList = [];
          categories.forEach(category => {
            categoriesList.push({
              label: category.name,
              value: category.id,
            });
          });
          return categoriesList;
        })
      );
  }

  getTags() {
    return this._tagService.getTagList(1, 200)
      .pipe(
        map(data => {
          let tags = data.data.rows;
          let tagsList = [];
          tags.forEach(tag => {
            tagsList.push({
              label: tag.name,
              value: tag.id,
            });
          });
          return tagsList;
        })
      );
  }
}

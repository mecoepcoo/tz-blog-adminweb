import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema, SFSchemaEnumType, SFComponent } from '@delon/form';
import { IPost } from '@interfaces/post';
import { map } from 'rxjs/operators'

import { PostService } from '../../post.service';
import { CategoryService } from '../../../category/category.service';
import { TagService } from '../../../tag/tag.service';

@Component({
  selector: 'app-post-list-edit',
  templateUrl: './edit.component.html',
  providers: [
    CategoryService,
    TagService,
  ],
})
export class PostListEditComponent implements OnInit {
  @ViewChild('sf') sf: SFComponent;
  id: string;
  post: IPost;

  editSchema: SFSchema = {
    properties: {
      id: {
        type: 'string',
        title: 'id',
        readOnly: true,
      },
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
    $id: {
      widget: 'text',
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
    private route: ActivatedRoute,
    private router: Router,
    public http: _HttpClient,
    private _postService: PostService,
    private _categoryService: CategoryService,
    private _tagService: TagService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getPost(this.id);
  }

  save(value: any) {
    let { title, author, order, category, tags, content } = value;
    tags = JSON.stringify(tags);
    // content = content.replace(/\r\n/g, '\r\n').replace(/[^\r]\n/g, '\r\n').replace(/\s/g, ' ');
    this._postService.editPost(this.id, title, author, content, order, category, tags)
      .subscribe(res => {
        this.msgSrv.success('修改成功');
        this.router.navigate(['/post/list']);
      }, err => {
        this.msgSrv.error('修改失败');
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

  getPost(id) {
    this._postService.getPost(id).subscribe(data => {
      let post = data.data;
      this.post = {
        id: post.id,
        title: post.title,
        author: post.author,
        post_content: post.post_content,
        status: post.status,
        order: post.order,
        read_count: post.read_count,
      };
      this.editSchema.properties.id.default = post.id;
      this.editSchema.properties.title.default = post.title;
      this.editSchema.properties.author.default = post.author;
      let content = post.post_content.replace(/\<br\>/g, '\n');
      this.editSchema.properties.content.default = content;
      this.editSchema.properties.order.default = post.order;
      this.editSchema.properties.category.default = post.category.id;
      let tags = [];
      post.tags.forEach(tag => tags.push(tag.id));
      this.editSchema.properties.tags.default = tags;
      this.sf.refreshSchema();
    })
  }
}

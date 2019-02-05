import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STData } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { PostListAddComponent } from "./add/add.component";
import { PostService } from '../post.service';
import { IPost } from '@interfaces/post';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './list.component.html',
})
export class PostListComponent implements OnInit {
  list: IPost[];
  total: number = 0;
  page: number = 1;
  size: number = 10;
  loading: boolean = true;

  searchSchema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '名称'
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: 'id', index: 'id', width: '200px' },
    { title: '标题', index: 'title' },
    { title: '作者', index: 'author' },
    { title: '排序', index: 'order', type: 'number', width: '200px' },
    { title: '阅读量', index: 'read_count', type: 'number', width: '200px' },
    { title: '创建时间', index: 'created_at', type: 'date' },
    {
      title: '操作',
      buttons: [
        /* { 
          text: '查看',
          icon: 'eye',
          type: 'modal',
          modal: {
            component: PostListViewComponent,
            params: record => record,
            paramsName: 'record',
          },
        }, */
        /* { 
          text: '编辑',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: PostListEditComponent,
            params: record => record,
            paramsName: 'record',
          },
          click: (record: STData) => {
            this.refresh();
          }
        }, */
        { 
          icon: 'delete',
          type: 'del',
          click: (record, modal, comp) => {
            this._postService.delPost(record.id)
              .subscribe(res => {
                console.log(res);
                this.message.success(`成功删除【${record.title}】`);
                comp.removeRow(record);
              })
          }
        },
      ]
    }
  ];

  init() {
    this.loading = true;
    this.getList();
  }

  refresh() {
    this.getList(this.page, this.size);
  }

  change(e) {
    if (e.type == 'pi' || e.type == 'ps') {
      this.loading = true;
      this.page = e.pi;
      this.size = e.ps;
      this.getList(this.page, this.size);
    }
  }

  search(e) {
    console.log(e);
  }

  reset(e) {
    console.log(e);
    this.init();
  }

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private _postService: PostService,
    private message: NzMessageService,
    private router: Router,
  ) { }

  ngOnInit() { 
    this.init();
  }

  add() {
    this.router.navigate(['/post/add']);
  }

  getList(page = 1, size = 10) {
    return this._postService.getPostList(page, size).subscribe(res => {
      let data = res.data;
      this.list = data.rows;
      this.total = data.count;
      this.loading = false;
    }, error => {
      console.log(error);
    });
  }
}

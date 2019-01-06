import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STData } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { BlogrollListEditComponent } from './edit/edit.component';
import { BlogrollListAddComponent } from "./add/add.component";
import { BlogrollService } from '../blogroll.service';
import { IBlogroll } from '@interfaces/blogroll';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-blogroll-list',
  templateUrl: './list.component.html',
})
export class BlogrollListComponent implements OnInit {
  list: IBlogroll[];
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
    { title: '名称', index: 'name', width: '230px' },
    { title: '链接', index: 'url' },
    {
      title: '操作',
      buttons: [
        { 
          text: '编辑',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: BlogrollListEditComponent,
            params: record => record,
            paramsName: 'record',
          },
          click: (record: STData) => {
            this.refresh();
          }
        },
        { 
          icon: 'delete',
          type: 'del',
          click: (record, modal, comp) => {
            this._blogrollService.delBlogroll(record.id)
              .subscribe(res => {
                console.log(res);
                this.message.success(`成功删除【${record.name}】`);
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
    private _blogrollService: BlogrollService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.init();
  }

  add() {
    this.modal
      .createStatic(BlogrollListAddComponent, { record: { id: 0 } })
      .subscribe(() => this.st.reload());
  }

  getList(page = 1, size = 10) {
    return this._blogrollService.getBlogrollList(page, size).subscribe(res => {
      console.log(res);
      let data = res.data;
      this.list = data.rows;
      this.total = data.count;
      this.loading = false;
    }, error => {
      console.log(error);
    });
  }

}

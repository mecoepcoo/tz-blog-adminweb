import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { CategoryListEditComponent } from './edit/edit.component';
import { CategoryListViewComponent } from './view/view.component';
import { CategoryService } from '../category.service';
import { ICategory } from '@interfaces/category';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-category-list',
  templateUrl: './list.component.html',
})
export class CategoryListComponent implements OnInit {
  list: ICategory[];
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
    { title: '名称', index: 'name' },
    { title: '数量', index: 'post_count', type: 'number', sort: true, width: '200px' },
    {
      title: '操作',
      buttons: [
        { 
          text: '查看',
          icon: 'eye',
          type: 'modal',
          modal: {
            component: CategoryListViewComponent,
            params: record => {
              console.log(record)
              return record
            },
            paramsName: 'record',
          },
          click: (record: any, modal: any) => {
            console.log('点击了查看', record, modal)
            return this.message.success(
              `重新加载页面，回传值：${JSON.stringify(modal)}`,
            )
          }
          // click: (record: any, modal: any) => console.log('点击了查看', record, modal)
        },
        { 
          text: '编辑',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: CategoryListEditComponent,
          },
          click: (record: any, modal: any) => console.log('点击了编辑')
        },
      ]
    }
  ];

  init() {
    this.loading = true;
    this.getList();
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
    private _categoryService: CategoryService,
    private message: NzMessageService,
  ) { }

  ngOnInit() { 
    this.init();
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  getList(page = 1, size = 10) {
    return this._categoryService.getCategoryList(page, size).subscribe(res => {
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

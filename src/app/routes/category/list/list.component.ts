import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { CategoryListEditComponent } from './edit/edit.component';
import { CategoryListViewComponent } from './view/view.component';
import { CategoryService } from '../category.service';
import { ICategory } from '@interfaces/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './list.component.html',
  providers: [
    CategoryService,
  ],
})
export class CategoryListComponent implements OnInit {
  list: ICategory[] = [];
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: 'id'
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
          },
          click: (record: any, modal: any) => console.log('点击了查看', record, modal)
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

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private _categoryService: CategoryService,
  ) { }

  ngOnInit() { 
    this.getCategoryList();
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  getCategoryList() {
    return this._categoryService.getCategoryList(1, 10).subscribe(res => {
      console.log(res);
      let data = res.data;
      this.list = data.rows;
    }, error => {
      console.log(error);
    });
  }

}

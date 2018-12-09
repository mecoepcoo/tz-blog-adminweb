import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { CategoryListEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './list.component.html',
})
export class CategoryListComponent implements OnInit {
  url = `/user`;
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
    { title: 'id', index: 'no' },
    { title: '调用次数', type: 'number', index: 'callNo' },
    { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '操作',
      buttons: [
        { text: '查看', click: (item: any) => `/form/${item.id}` },
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

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}

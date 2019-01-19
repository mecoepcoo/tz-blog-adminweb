import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STData } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { AuserListEditComponent } from './edit/edit.component';
import { AuserListAddComponent } from "./add/add.component";
import { AuserService } from '../auser.service';
import { NzMessageService } from 'ng-zorro-antd';
import { IAuser } from '@interfaces/auser';

@Component({
  selector: 'app-category-list',
  templateUrl: './list.component.html',
})
export class AuserListComponent implements OnInit {
  list: IAuser[];
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
    { title: '用户名', index: 'user_name' },
    { title: '状态', index: 'status' },
    {
      title: '操作',
      buttons: [
        { 
          text: '编辑',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: AuserListEditComponent,
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
            this._auserService.delAuser(record.id)
              .subscribe(res => {
                console.log(res);
                this.message.success(`成功删除【${record.user_name}】`);
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
    private _auserService: AuserService,
    private message: NzMessageService,
  ) { }

  ngOnInit() { 
    this.init();
  }

  add() {
    this.modal
      .createStatic(AuserListAddComponent, { record: { id: 0 } })
      .subscribe(() => this.st.reload());
  }

  getList(page = 1, size = 10) {
    return this._auserService.getAuserList(page, size).subscribe(res => {
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

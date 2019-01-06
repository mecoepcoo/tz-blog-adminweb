import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STData } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { BlogrollListEditComponent } from './edit/edit.component';
import { BlogrollListAddComponent } from "./add/add.component";
import { TagService } from '../tag.service';
import { Itag } from '@interfaces/tag';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-tag-list',
  templateUrl: './list.component.html',
})
export class TagListComponent implements OnInit {
  list: Itag[];
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
            component: TagListViewComponent,
            params: record => record,
            paramsName: 'record',
          },
        },
        { 
          text: '编辑',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: TagListEditComponent,
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
            this._tagService.delTag(record.id)
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
    private _tagService: TagService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.init();
  }

  add() {
    this.modal
      .createStatic(TagListAddComponent, { record: { id: 0 } })
      .subscribe(() => this.st.reload());
  }

  getList(page = 1, size = 10) {
    return this._tagService.getTagList(page, size).subscribe(res => {
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

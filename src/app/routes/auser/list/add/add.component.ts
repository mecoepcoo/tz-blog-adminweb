import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

import { AuserService } from "../../auser.service";

@Component({
  selector: 'app-category-list-add',
  templateUrl: './add.component.html',
})
export class AuserListAddComponent implements OnInit {
  record: any = {};
  data: any;
  schema: SFSchema = {
    properties: {
      post_count: {type: 'number', title: '文章数', default: 0, minimum: 0 },
      name: { type: 'string', title: '名称', maxLength: 15 },
    },
    required: ['name'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $post_count: {
      widget: 'number',
    },
    $name: {
      widget: 'string',
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private _auserService: AuserService,
  ) {}

  ngOnInit(): void {
    console.log(this.record);
    this.data = this.record;
  }

  save(value: any) {
    this._auserService.addAuser(value.name)
      .subscribe(res => {
        this.msgSrv.success('新建成功');
        this.modal.close(true);
      });
  }

  close() {
    this.modal.destroy();
  }
}
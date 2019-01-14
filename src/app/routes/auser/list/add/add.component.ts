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
      name: {type: 'string', title: '用户名', maxLength: 15 },
      pwd: { type: 'string', title: '密码', maxLength: 15, minLength: 6 },
    },
    required: ['name'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $name: {
      widget: 'string',
    },
    $pwd: {
      widget: 'string',
      type: 'password',
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
    this._auserService.addAuser(value.name, value.pwd)
      .subscribe(res => {
        this.msgSrv.success('新建成功');
        this.modal.close(true);
      });
  }

  close() {
    this.modal.destroy();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

import { AuserService } from "../../auser.service";

@Component({
  selector: 'app-auser-list-edit',
  templateUrl: './edit.component.html',
})
export class AuserListEditComponent implements OnInit {
  record: any = {};
  data: any;
  schema: SFSchema = {
    properties: {
      id: { type: 'string', title: 'id', readOnly: true },
      userName: { type: 'string', title: '用户名', readOnly: true },
      originPwd: { type: 'string', title: '原密码' },
      newPwd: {type: 'string', title: '新密码' },
    },
    required: ['password'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $id: {
      widget: 'text'
    },
    $userName: {
      widget: 'text',
    },
    $originPwd: {
      widget: 'password',
    },
    $newPwd: {
      widget: 'password',
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private _auserService: AuserService,
  ) {}

  ngOnInit(): void {
    this.data = this.record;
  }

  save(value: any) {
    this._auserService.editPwd(this.data.id, value.name)
      .subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
  }

  close() {
    this.modal.destroy();
  }
}

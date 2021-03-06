import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { BlogrollService } from '../../blogroll.service';

@Component({
  selector: 'app-blogroll-list-add',
  templateUrl: './add.component.html',
})
export class BlogrollListAddComponent implements OnInit {
  record: any = {};
  data: any;
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '名称', maxLength: 15 },
      url: {type: 'string', title: '链接', pattern: '^https?:\/\/' },
    },
    required: ['name', 'url'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $name: {
      widget: 'string',
    },
    $url: {
      widget: 'string',
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private _blogrollService: BlogrollService,
  ) {}

  ngOnInit(): void {
    this.data = this.record;
  }

  save(value: any) {
    this._blogrollService.addBlogroll(value.name, value.url)
      .subscribe(res => {
        this.msgSrv.success('新建成功');
        this.modal.close(true);
      });
  }

  close() {
    this.modal.destroy();
  }
}

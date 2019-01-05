import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { TagService } from '../../tag.service';

@Component({
  selector: 'app-tag-list-edit',
  templateUrl: './edit.component.html',
})
export class TagListEditComponent implements OnInit {
  record: any = {};
  data: any;
  schema: SFSchema = {
    properties: {
      id: { type: 'string', title: 'id', readOnly: true },
      post_count: {type: 'number', title: '文章数' },
      name: { type: 'string', title: '名称', maxLength: 15 },
    },
    required: ['name'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $id: {
      widget: 'text'
    },
    $post_count: {
      widget: 'text',
    },
    $name: {
      widget: 'string',
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private _tagService: TagService,
  ) {}

  ngOnInit(): void {
    this.data = this.record;
  }

  save(value: any) {
    this._tagService.editTag(this.data.id, value.name)
      .subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
  }

  close() {
    this.modal.destroy();
  }
}

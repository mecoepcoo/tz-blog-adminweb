import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

import { TagService } from '../../tag.service';

@Component({
  selector: 'app-tag-list-view',
  templateUrl: './view.component.html',
})
export class TagListViewComponent implements OnInit {
  record: any = {};
  data: any;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private _tagService: TagService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._tagService.getTag(this.record.id).subscribe(res => this.data = res.data);
  }

  close() {
    this.modal.destroy();
  }
}

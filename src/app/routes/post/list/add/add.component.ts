import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

import { PostService } from "../../post.service";

@Component({
  selector: 'app-post-list-add',
  templateUrl: './add.component.html',
})
export class PostListAddComponent implements OnInit {
  
  constructor(
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private _postService: PostService,
  ) {}

  ngOnInit(): void {
  }

}

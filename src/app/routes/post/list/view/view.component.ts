import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-category-list-view',
  templateUrl: './view.component.html',
})
export class CategoryListViewComponent implements OnInit {
  record: any = {};
  data: any;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    private _categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._categoryService.getCategory(this.record.id).subscribe(res => this.data = res.data);
  }

  close() {
    this.modal.destroy();
  }
}

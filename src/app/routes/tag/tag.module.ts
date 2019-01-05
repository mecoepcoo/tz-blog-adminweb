import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TagRoutingModule } from './tag-routing.module';
import { TagListComponent } from './list/list.component';
import { TagListEditComponent } from './list/edit/edit.component';
import { TagListViewComponent } from './list/view/view.component';
import { TagListAddComponent } from './list/add/add.component';

import { TagService } from './tag.service';

const COMPONENTS = [
  TagListComponent];
const COMPONENTS_NOROUNT = [
  TagListEditComponent,
  TagListViewComponent,
  TagListAddComponent];

@NgModule({
  imports: [
    SharedModule,
    TagRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  providers: [
    TagService,
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class TagModule { }

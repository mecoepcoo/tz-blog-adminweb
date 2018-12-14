import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TagRoutingModule } from './tag-routing.module';
import { TagListComponent } from './list/list.component';
import { TagListEditComponent } from './list/edit/edit.component';
import { TagListViewComponent } from './list/view/view.component';

const COMPONENTS = [
  TagListComponent];
const COMPONENTS_NOROUNT = [
  TagListEditComponent,
  TagListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    TagRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class TagModule { }

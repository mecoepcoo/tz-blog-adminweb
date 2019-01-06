import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BlogrollRoutingModule } from './blogroll-routing.module';
import { BlogrollListComponent } from './list/list.component';
import { BlogrollListEditComponent } from './list/edit/edit.component';
import { BlogrollListAddComponent } from "./list/add/add.component";

import { BlogrollService } from './blogroll.service';

const COMPONENTS = [
  BlogrollListComponent
];
const COMPONENTS_NOROUNT = [
  BlogrollListAddComponent,
  BlogrollListEditComponent
];

@NgModule({
  imports: [
    SharedModule,
    BlogrollRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  providers: [
    BlogrollService,
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class BlogrollModule { }

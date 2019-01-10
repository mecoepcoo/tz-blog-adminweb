import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AuserRoutingModule } from './auser-routing.module';
import { AuserListComponent } from './list/list.component';
import { AuserListEditComponent } from './list/edit/edit.component';
import { AuserListAddComponent } from "./list/add/add.component";

import { AuserService } from './auser.service';

const COMPONENTS = [
  AuserListComponent,
];
const COMPONENTS_NOROUNT = [
  AuserListEditComponent,
  AuserListAddComponent,
];

@NgModule({
  imports: [
    SharedModule,
    AuserRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  providers: [
    AuserService,
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class AuserModule { }

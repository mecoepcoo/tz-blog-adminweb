import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AuserRoutingModule } from './auser-routing.module';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    AuserRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class AuserModule { }

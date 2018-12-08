import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TagRoutingModule } from './tag-routing.module';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

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

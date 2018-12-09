import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BlogrollRoutingModule } from './blogroll-routing.module';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    BlogrollRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class BlogrollModule { }
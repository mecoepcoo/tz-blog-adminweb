import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ToolboxRoutingModule } from './toolbox-routing.module';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    ToolboxRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ToolboxModule { }

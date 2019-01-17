import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './list/list.component';
import { PostListAddComponent } from "./list/add/add.component";

import { PostService } from './post.service';

const COMPONENTS = [
  PostListComponent];
const COMPONENTS_NOROUNT = [
  PostListAddComponent];

@NgModule({
  imports: [
    SharedModule,
    PostRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  providers: [
    PostService,
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class PostModule { }

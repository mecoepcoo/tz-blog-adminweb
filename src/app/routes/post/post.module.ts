import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './list/list.component';
import { PostListAddComponent } from './list/add/add.component';
import { PostListEditComponent } from './list/edit/edit.component';

import { PostService } from './post.service';

const COMPONENTS = [
  PostListComponent,
  PostListAddComponent,
  PostListEditComponent];
const COMPONENTS_NOROUNT = [];

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

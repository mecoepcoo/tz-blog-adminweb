import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './list/list.component';
import { PostListAddComponent } from './list/add/add.component';

const routes: Routes = [
  {
    path: 'list',
    component: PostListComponent,
    data: { title: '文章列表' },
  },
  {
    path: 'add',
    component: PostListAddComponent,
    data: { title: '新增文章' },
  },
  {
    path: '',
    redirectTo: 'list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }

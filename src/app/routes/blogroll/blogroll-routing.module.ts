import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogrollListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'list',
    component: BlogrollListComponent,
    data: { title: '友情链接' },
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
export class BlogrollRoutingModule { }

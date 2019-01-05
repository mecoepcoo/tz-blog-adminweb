import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'list',
    component: TagListComponent,
    data: { title: '标签' },
  },
  {
    path: '',
    redirectTo: 'list'
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }

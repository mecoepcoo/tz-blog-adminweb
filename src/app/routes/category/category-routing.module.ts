import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'list',
    component: CategoryListComponent,
    data: { title: '分类' },
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
export class CategoryRoutingModule { }

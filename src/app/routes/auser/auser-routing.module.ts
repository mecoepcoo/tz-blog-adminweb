import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuserListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'list',
    component: AuserListComponent,
    data: { title: '管理员' },
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
export class AuserRoutingModule { }

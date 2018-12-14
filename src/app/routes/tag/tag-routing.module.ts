import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'list', component: TagListComponent },
  { path: '', redirectTo: 'list' },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }

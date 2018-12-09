import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './list/list.component';
import { CategoryListEditComponent } from './list/edit/edit.component';
import { CategoryListViewComponent } from './list/view/view.component';

const COMPONENTS = [
  CategoryListComponent];
const COMPONENTS_NOROUNT = [
  CategoryListEditComponent,
  CategoryListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    CategoryRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class CategoryModule { }

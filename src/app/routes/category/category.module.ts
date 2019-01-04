import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './list/list.component';
import { CategoryListEditComponent } from './list/edit/edit.component';
import { CategoryListViewComponent } from './list/view/view.component';
import { CategoryListAddComponent } from "./list/add/add.component";

import { CategoryService } from './category.service';

const COMPONENTS = [
  CategoryListComponent];
const COMPONENTS_NOROUNT = [
  CategoryListEditComponent,
  CategoryListViewComponent,
  CategoryListAddComponent];

@NgModule({
  imports: [
    SharedModule,
    CategoryRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  providers: [
    CategoryService,
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class CategoryModule { }

import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryCategoryComponent } from './category/category.component';
import { CategoryCategoryEditComponent } from './category/edit/edit.component';
import { CategoryCategoryViewComponent } from './category/view/view.component';

const COMPONENTS = [
  CategoryCategoryComponent];
const COMPONENTS_NOROUNT = [
  CategoryCategoryEditComponent,
  CategoryCategoryViewComponent];

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

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from "./layouts/default/default.component";
import {HomeComponent} from "./modules/home/home.component";
import {ProductComponent} from "./modules/product/product.component";
import {FullpageComponent} from "./layouts/fullpage/fullpage.component";
import {LoginComponent} from "./modules/login/login.component";
import {FullpageadminComponent} from "./layouts/fullpageadmin/fullpageadmin.component";
import {AdminComponent} from "./modules/admin/admin.component";
import {AdminProductComponent} from "./modules/admin/admin-product/admin-product.component";
import {
  AdminProductUpdateComponent
} from "./modules/admin/admin-product/admin-product-update/admin-product-update.component";
import {AdminProductAddComponent} from "./modules/admin/admin-product/admin-product-add/admin-product-add.component";
import {ProductDetailsComponent} from "./modules/product-details/product-details.component";
import {AdminCategoryComponent} from "./modules/admin/admin-category/admin-category.component";
import {
  AdminCategoryAddComponent
} from "./modules/admin/admin-category/admin-category-add/admin-category-add.component";
import {
  AdminCategoryUpdateComponent
} from "./modules/admin/admin-category/admin-category-update/admin-category-update.component";
import {CategoryComponent} from "./modules/category/category.component";
import {BasketComponent} from "./modules/basket/basket.component";
import {OrderComponent} from "./modules/order/order.component";
import {AdminOrderComponent} from "./modules/admin/admin-order/admin-order.component";
import {AdminOrderUpdateComponent} from "./modules/admin/admin-order/admin-order-update/admin-order-update.component";

const routes: Routes = [
  {
    path: '', component: DefaultComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'products', component: ProductComponent},
      {path: 'product/:slug', component: ProductDetailsComponent},
      {path: 'category/:slug', component: CategoryComponent},
      {path: 'basket', component: BasketComponent},
      {path: 'order', component: OrderComponent}
    ]
  },
  {
    path: '', component: FullpageComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent}
    ]
  },
  {
    path: '', component: FullpageadminComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'admin', component: AdminComponent},
      {path: 'admin/products', component: AdminProductComponent},
      {path: 'admin/products/update/:id', component: AdminProductUpdateComponent},
      {path: 'admin/products/add', component: AdminProductAddComponent},
      {path: 'admin/categories', component: AdminCategoryComponent},
      {path: 'admin/category/add', component: AdminCategoryAddComponent},
      {path: 'admin/category/update/:id', component: AdminCategoryUpdateComponent},
      {path: 'admin/orders', component: AdminOrderComponent},
      {path: 'admin/order/update/:id', component: AdminOrderUpdateComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

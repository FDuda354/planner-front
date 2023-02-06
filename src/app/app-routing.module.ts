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
import {AdminOrderExportComponent} from "./modules/admin/admin-order/admin-order-export/admin-order-export.component";
import {AdminOrderStatsComponent} from "./modules/admin/admin-order/admin-order-stats/admin-order-stats.component";
import {AdminLoginComponent} from "./modules/admin/admin-login/admin-login.component";
import {FullpageadminemptyComponent} from "./layouts/fullpageadminempty/fullpageadminempty.component";
import {AdminAuthGuard} from "./modules/admin/common/guard/adminAuthGuard";
import {ProfileComponent} from "./modules/profile/profile.component";
import {ProfileAuthGuard} from "./modules/common/guard/profileAuthGuard";
import {LostPasswordComponent} from "./modules/login/lost-password/lost-password.component";

const routes: Routes = [
  {
    path: '', component: DefaultComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'products', component: ProductComponent},
      {path: 'product/:slug', component: ProductDetailsComponent},
      {path: 'category/:slug', component: CategoryComponent},
      {path: 'basket', component: BasketComponent},
      {path: 'order', component: OrderComponent},
      {path: 'profile', component: ProfileComponent, canActivate: [ProfileAuthGuard]},
    ]
  },
  {
    path: '', component: FullpageComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'lostPassword/:hash', component: LostPasswordComponent},
      {path: 'lostPassword', component: LostPasswordComponent},
    ]
  },
  {
    path: '', component: FullpageadminComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/products', component: AdminProductComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/products/update/:id', component: AdminProductUpdateComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/products/add', component: AdminProductAddComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/categories', component: AdminCategoryComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/category/add', component: AdminCategoryAddComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/category/update/:id', component: AdminCategoryUpdateComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/orders', component: AdminOrderComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/order/update/:id', component: AdminOrderUpdateComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/orders/export', component: AdminOrderExportComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/orders/stats', component: AdminOrderStatsComponent, canActivate: [AdminAuthGuard]},

    ]
  },
  {
    path: '', component: FullpageadminemptyComponent, children: [
      {path: 'admin/login', component: AdminLoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

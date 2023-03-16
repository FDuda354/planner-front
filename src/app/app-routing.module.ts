import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from "./layouts/default/default.component";
import {HomeComponent} from "./modules/home/home.component";

import {FullpageComponent} from "./layouts/fullpage/fullpage.component";
import {LoginComponent} from "./modules/login/login.component";
import {FullpageadminComponent} from "./layouts/fullpageadmin/fullpageadmin.component";
import {AdminComponent} from "./modules/admin/admin.component";
import {AdminLoginComponent} from "./modules/admin/admin-login/admin-login.component";
import {FullpageadminemptyComponent} from "./layouts/fullpageadminempty/fullpageadminempty.component";
import {AdminAuthGuard} from "./modules/admin/common/guard/adminAuthGuard";
import {LostPasswordComponent} from "./modules/login/lost-password/lost-password.component";
import {FullpageuserComponent} from "./layouts/fullpageuser/fullpageuser.component";
import {CalendarComponent} from "./modules/calendar/calendar.component";
import {TodolistComponent} from "./modules/todolist/todolist.component";
import {InvoiceComponent} from "./modules/invoice/invoice.component";
import {ProfileComponent} from "./modules/profile/profile.component";
import {AddtaskComponent} from "./modules/todolist/addtask/addtask.component";
import {UpdatetaskComponent} from "./modules/todolist/updatetask/updatetask.component";
import {UpdateInvoiceComponent} from "./modules/invoice/update-invoice/update-invoice.component";
import {AddInvoiceComponent} from "./modules/invoice/add-invoice/add-invoice.component";
import {InvoiceFactoryComponent} from "./modules/invoice/invoice-factory/invoice-factory.component";


const routes: Routes = [
  {
    path: '', component: DefaultComponent, children: [
      {path: '', component: HomeComponent, canActivate: [AdminAuthGuard]},
      {path: 'calendar', component: CalendarComponent, canActivate: [AdminAuthGuard]},
      {path: 'todolist', component: TodolistComponent, canActivate: [AdminAuthGuard]},
      {path: 'task/add', component: AddtaskComponent, canActivate: [AdminAuthGuard]},
      {path: 'task/update/:id', component: UpdatetaskComponent, canActivate: [AdminAuthGuard]},
      {path: 'invoices', component: InvoiceComponent, canActivate: [AdminAuthGuard]},
      {path: 'invoice/add', component: AddInvoiceComponent, canActivate: [AdminAuthGuard]},
      {path: 'invoice/update/:slug', component: UpdateInvoiceComponent, canActivate: [AdminAuthGuard]},
      {path: 'profile', component: ProfileComponent, canActivate: [AdminAuthGuard]},
      {path: 'invoices/factory', component: InvoiceFactoryComponent, canActivate: [AdminAuthGuard]},

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

    ]
  },
  {
    path: '', component: FullpageadminemptyComponent, children: [
      {path: 'admin/login', component: AdminLoginComponent}
    ]
  },
  {
    path: '', component: FullpageuserComponent, children: [
      {path: '', component: HomeComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

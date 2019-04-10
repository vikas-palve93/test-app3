import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { OrganizationsComponent } from './Components/organizations/organizations.component';
import { DataTableModule } from 'angular-6-datatable'
import { NgDatepickerModule } from 'ng2-datepicker';
import { FileFilterPipe } from './Util/serach-filter.pipe';
import { from } from 'rxjs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxPermissionsModule, NgxPermissionsGuard } from 'ngx-permissions';
import { MatRadioModule } from '@angular/material/radio';

import { OrganizationProfileComponent } from './Components/Settings/organization-profile/organization-profile.component';
import { AdminProfileComponent } from './Components/Settings/admin-profile/admin-profile.component';
import { UsersComponent } from './Components/Settings/users/users.component';
import { PurchasesComponent } from './Components/Settings/purchases/purchases.component';
import { SettingsMenuComponent } from './Components/Settings/settings-menu/settings-menu.component';
import { AngularWebStorageModule } from 'angular-web-storage';
import { RolesComponent } from './Components/roles/roles.component';
import { AddUserComponent } from './Templates/add-user/add-user.component';
import { ChangeRoleComponent } from './Templates/change-role/change-role.component';
import { BroadcastComponent } from './Components/broadcast/broadcast.component';
import { PromoComponent } from './Components/promo/promo.component';
import { PlansComponent } from './Components/plans/plans.component';
import { DeleteConfirmationComponent } from './Templates/delete-confirmation/delete-confirmation.component';
import { CodegripAdminProfileComponent } from './Components/codegrip-admin-profile/codegrip-admin-profile.component';
import { ChangeUserRoleComponent } from './Templates/change-user-role/change-user-role.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { LoginComponent } from './Components/login/login.component';
import { ReferComponent } from './Templates/refer/refer.component';
import { ReferredUsersComponent } from './Components/referred-users/referred-users.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: "dashboard", component: DashboardComponent },
  { path: "organizations", component: OrganizationsComponent },
  { path: "roles", component: RolesComponent },
  { path: "settings/organization", component: OrganizationProfileComponent },
  { path: "settings/admin", component: AdminProfileComponent },
  { path: "settings/users", component: UsersComponent },
  { path: "settings/purchases", component: PurchasesComponent },
  { path: "broadcast", component: BroadcastComponent },
  { path: "promo", component: PromoComponent },
  { path: "plans", component: PlansComponent },
  { path: "admin/profile", component: CodegripAdminProfileComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "login", component: LoginComponent },
  { path: "referred/users", component: ReferredUsersComponent },
  { path: "**", component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    OrganizationsComponent,
    FileFilterPipe,
    OrganizationProfileComponent,
    AdminProfileComponent,
    UsersComponent,
    PurchasesComponent,
    SettingsMenuComponent,
    RolesComponent,
    AddUserComponent,
    ChangeRoleComponent,
    BroadcastComponent,
    PromoComponent,
    PlansComponent,
    DeleteConfirmationComponent,
    CodegripAdminProfileComponent,
    ChangeUserRoleComponent,
    NotificationsComponent,
    LoginComponent,
    ReferComponent,
    ReferredUsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgDatepickerModule,
    RouterModule.forRoot(routes),
    DataTableModule,
    AngularWebStorageModule,
    ModalModule.forRoot(),
    NgSelectModule,
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
    }),
    InfiniteScrollModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

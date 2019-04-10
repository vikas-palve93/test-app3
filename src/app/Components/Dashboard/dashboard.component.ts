import { Component, OnInit } from '@angular/core';
import { DashboardService } from './../../Services/dashboard.service'
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'angular-web-storage'
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardData: any;
  access_token;

  constructor(
    private dashboardService: DashboardService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStorage: LocalStorageService,
    private router: Router,
    private permissionsService: NgxPermissionsService,
  ) { }

  ngOnInit() {
    let userData = this.localStorage.get("loggedInUserData");
    if (!userData.userDetails) {
      this.router.navigate(['login']);
    }
    else {
      this.access_token = this.localStorage.get("loggedInUserData").tokenData.access_token;
      const perm = [userData.userDetails.roles[0].name];
      console.log(perm)
      this.permissionsService.loadPermissions(perm);
      this.getDashboardData();
    }
  }

  getDashboardData() {
    console.log(this.access_token)
    this.spinnerService.show();
    this.dashboardService.dashboardDataAPI(this.access_token).subscribe(
      (res: any) => {
        this.spinnerService.hide();
        this.dashboardData = res.object;
        this.toastr.success(res.message);
      },
      (err: any) => {
        if (err.status === 401) {
          this.router.navigate(['login']);
          this.spinnerService.hide();
          this.toastr.error("Session expired, Please login again.");
        } else {
          this.spinnerService.hide();
          console.log(err);
          this.toastr.error(err.message);
        }
      })
  }
}

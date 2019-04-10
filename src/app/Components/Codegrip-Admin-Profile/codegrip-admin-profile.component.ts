import { Component, OnInit } from '@angular/core';
import { countries } from './../../Util/countries';
import * as $ from "jquery";
import { LocalStorageService } from "angular-web-storage";
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UsersService } from './../../Services/users.service';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';

@Component({
  selector: 'app-codegrip-admin-profile',
  templateUrl: './codegrip-admin-profile.component.html',
  styleUrls: ['./codegrip-admin-profile.component.css']
})
export class CodegripAdminProfileComponent implements OnInit {

  adminData: any = {};
  errordata: any = {};
  error: any = {};
  name;
  userName;
  userEmail;
  userRole;
  userCountry;
  userProfileImage;
  contactDetails;
  countryCode;
  countries = countries;
  access_token;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private userService: UsersService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    let userData = this.localStorage.get("loggedInUserData");
    if (!userData.userDetails) {
      this.router.navigate(['login']);
    }
    else {
      this.access_token = this.localStorage.get("loggedInUserData").tokenData.access_token;
      this.adminData = userData.userDetails;
    }
  }

  setProfileData() {
    $("ng-select").trigger('reset');
    $("newPassword").trigger('reset');
    this.adminData.newPassword = "";
    let adminData = this.localStorage.get("loggedInUserData");
    let adminData1 = adminData.userDetails;
    if (adminData1.name == null) {
      $("#name").trigger('reset');
    } else {
      this.adminData.name = adminData1.name;
    }
    if (adminData1.password == null) {
      $("#name").trigger('reset');
    } else {
      this.adminData.password = adminData1.password;
    }
    this.adminData.email = adminData1.email;
    this.adminData.contactNo = adminData1.contactNo;

    if (adminData1.country !== null) {
      this.adminData.country = adminData1.country;
    } else {
      $("ng-select").trigger('reset');
      this.adminData.country = adminData1.country;
    }
    this.adminData.countryCode = adminData1.countryCode;
    this.adminData.profilePictureUrl = adminData1.profilePictureUrl;
  }

  setCountryCode(countryName) {
    let countryObj = countries.find(function (element) {
      return element.name === countryName;
    });
    if (countryObj !== undefined) {
      this.adminData.countryCode = countryObj.code;
    } else {
      this.adminData.countryCode = null;
    }
  }

  characterOnly(event): boolean {
    var keyCode = (event.which) ? event.which : event.keyCode
    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)
      return false;
    return true;
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  updateAdminProfile() {
    console.log(this.adminData)
    let userDataArray = [this.adminData]
    this.spinnerService.show();
    this.userService.updateUserAPI(this.access_token, userDataArray).subscribe(
      (res: any) => {
        this.localStorage.set("userData", res.object);
        this.toastr.success(res.message);
        this.spinnerService.hide();
      },
      (err: any) => {
        if (err.error === 'invalid_token') {
          this.router.navigate(['login']);
          this.toastr.error("Session expired, Please login again.");
        }
        this.toastr.error(err.message)
        this.spinnerService.hide();
      }
    )
  }
}


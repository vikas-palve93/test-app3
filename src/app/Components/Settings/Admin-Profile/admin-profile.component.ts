import { Component, OnInit } from '@angular/core';
import { countries } from './../../../Util/countries';
import { LocalStorageService } from "angular-web-storage";
import * as $ from "jquery";
import { UsersService } from './../../../Services/users.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  errordata: any = {};
  error: any = {};
  userData: any = {};
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
    private userService: UsersService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userData = this.localStorage.get("loggedInUserData");
    if (this.userData === null || this.userData === undefined) {
      this.router.navigate(['login']);
    } else {
      this.access_token = this.localStorage.get("loggedInUserData").tokenData.access_token;
      this.setProfileData();
    }
  }

  setCountryCode(countryName) {
    let countryObj = countries.find(function (element) {
      return element.name === countryName;
    });
    if (countryObj !== undefined) {
      this.userData.countryCode = countryObj.code;
    } else {
      this.userData.countryCode = null;
    }
  }

  setProfileData() {
    $("ng-select").trigger('reset');
    let userData1 = this.localStorage.get("organizationAdminData");
    console.log(userData1)
    if (userData1.name == null) {
      $("#name").trigger('reset');
    } else {
      this.userData.name = userData1.name;
    }
    this.userData.email = userData1.email;
    this.userData.contactNo = userData1.contactNo;

    if (userData1.country !== null) {
      this.userData.country = userData1.country;
    } else {
      $("ng-select").trigger('reset');
      this.userData.country = userData1.country;
    }
    this.userData.id = userData1.id;
    this.userData.countryCode = userData1.countryCode;

    this.userData.profilePictureUrl = userData1.profilePictureUrl;
  }

  updateAdminProfile() {
    console.log(this.userData)
    let userData2 = this.localStorage.get("organizationAdminData");
    userData2.name = this.userData.name;
    userData2.email = this.userData.email;
    userData2.country = this.userData.country;
    userData2.countryCode = this.userData.countryCode;
    userData2.contactNo = this.userData.contactNo;
    let userDataArray = [userData2]
    console.log(userDataArray)
    this.spinnerService.show();
    this.userService.updateUserAPI(this.access_token, userDataArray).subscribe(
      (res: any) => {
        this.localStorage.set("organizationAdminData", res.object);
        this.setProfileData();
        console.log(res.object)
        this.toastr.success(res.message);
        this.spinnerService.hide();
      },
      (err: any) => {
        if (err.error.error === "invalid_token") {
          this.router.navigate(['login']);
          this.spinnerService.hide();
          this.toastr.error("Session expired, Please login again.");
        } else {
          this.toastr.error(err.message)
          this.spinnerService.hide();
        }
      }
    )

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

}

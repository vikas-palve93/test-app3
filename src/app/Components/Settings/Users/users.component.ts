import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../../Services/users.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from "angular-web-storage";
import { Router } from '@angular/router'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  data = null;
  totalUsersList = [];
  totalUsersCount = 0;
  currentUser: any;
  currentUserName;
  role: string;
  isOrgDeleteConfirmation = false;
  access_token;

  constructor(
    private userService: UsersService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    let userData = this.localStorage.get("loggedInUserData");
    if (userData === null || userData === undefined) {
      this.router.navigate(['login']);
    } else {
      this.access_token = this.localStorage.get("loggedInUserData").tokenData.access_token;
      this.getUserList();
    }
  }


  getUserList() {
    let currentOrgId = this.localStorage.get("organizationData")
    this.spinnerService.show();
    this.userService.getUserListAPI(this.access_token, currentOrgId.companyModel.id).subscribe(
      (res: any) => {
        this.data = res.object.userList;
        this.totalUsersCount = res.object.userList.length;
        this.spinnerService.hide();
      },
      (err: any) => {
        this.spinnerService.hide();
      }
    )
  }

  updateUser(user, isActivated, isDeleted, indexNo) {
    user.deactivated = isActivated;
    user.isDeactivateRequest = isActivated;
    user.isDeleted = isDeleted;
    let payload = [user];
    this.userService.updateUserAPI(this.access_token, payload).subscribe(
      (res: any) => {
        if (isDeleted) {
          this.data.splice(indexNo, 1);
        }
        this.toastr.success(res.message);
      },
      (err: any) => {
        this.toastr.error(err.message);
      }
    )
  }

  onClickPopoverClose() {
    document.getElementById("userPopoverActions").parentElement.click();
  }
}

import { Component, OnInit } from '@angular/core';
import { RoleService } from './../../Services/role.service';
import { UsersService } from './../../Services/users.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'angular-web-storage'
import { Router } from '@angular/router'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles: any;
  currentUser: any;
  data: any;
  role: string;
  access_token;

  constructor(
    private roleService: RoleService,
    private userService: UsersService,
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
      this.getRoleList();
      this.getUserlistWithRole();
    }
  }

  getUserlistWithRole() {
    this.roleService.getUserRoleListAPI(this.access_token).subscribe(
      (res: any) => {
        console.log(res);
        this.data = res.object;
      },
      (err: any) => {
        console.log(err);
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

  getRoleList() {
    this.roleService.getRoleListAPI(this.access_token).subscribe(
      (res: any) => {
        this.roles = res.object;
      },
      (err: any) => {

      }
    )
  }

  onClickPopoverClose() {
    document.getElementById("userPopoverActions").parentElement.click();
  }

}

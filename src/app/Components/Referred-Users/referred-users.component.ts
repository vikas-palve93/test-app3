import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LocalStorageService } from 'angular-web-storage'
import { UsersService } from './../../Services/users.service'
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-referred-users',
  templateUrl: './referred-users.component.html',
  styleUrls: ['./referred-users.component.css']
})
export class ReferredUsersComponent implements OnInit {

  data: any;

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private userService: UsersService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    let userData = this.localStorage.get("loggedInUserData");
    if (userData === null || userData === undefined) {
      this.router.navigate(['login']);
    } else {
      this.getReferredUserList();
    }
  }

  getReferredUserList() {
    this.spinnerService.show();
    this.userService.getReferredUserListAPI().subscribe(
      (res: any) => {
        this.data = res.object;
        this.spinnerService.hide();
      },
      (err: any) => {
        this.spinnerService.hide();
      }
    )
  }

}

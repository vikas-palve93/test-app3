import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from './../../Services/users.service';
import * as $ from "jquery";
import { LocalStorageService } from 'angular-web-storage'

@Component({
  selector: 'app-change-user-role',
  templateUrl: './change-user-role.component.html',
  styleUrls: ['./change-user-role.component.css']
})
export class ChangeUserRoleComponent implements OnInit, OnChanges {

  roles = [
    { id: 1, name: 'Admin', value: "ROLE_ADMIN" },
    { id: 2, name: 'User', value: "ROLE_USER" },
  ];

  @Input() changeUserRoleModel;
  @Input() currentUser: any;
  @Input() role: string;
  @Output() userEvent = new EventEmitter<string>();
  selectedRole;


  constructor(
    private toastr: ToastrService,
    private userService: UsersService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.role.currentValue === "ROLE_ADMIN") {
      this.role = this.roles[0].value;
    } else {
      this.role = this.roles[1].value;
    }
  }

  changeRole(role) {
    this.currentUser.roles = [{ id: 1, name: role, users: null }];
    let payload = this.currentUser;
    let access_token = this.localStorage.get("loggedInUserData").tokenData.access_token;
    this.userService.changeUserRoleAPI(access_token, payload).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        $("#changeUserRoleModel").click();
        this.userEvent.next();
      },
      (err: any) => {
        this.toastr.error(err.message);
      }
    )
  }
}

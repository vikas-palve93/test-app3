import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as $ from "jquery";
import { RoleService } from './../../Services/role.service';
import { UsersService } from './../../Services/users.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.css']
})
export class ChangeRoleComponent implements OnInit, OnChanges {
  @Input() currentUser: any;
  @Input() changeRoleModal;
  @Input() role: any;
  @Input() roles: any;
  @Output() userEvent = new EventEmitter<string>();

  constructor(
    private roleService: RoleService,
    private toastr: ToastrService,
    private userService: UsersService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("change data:", changes);
    if (changes.currentUser && changes.currentUser.currentValue) {
      /* this.getRoleList(); */
      for (let i = 0; i < this.roles.length; i++) {
        if (changes.currentUser.currentValue.userRole.id === this.roles[i].id) {
          this.role = this.roles[i].name;
          console.log(this.roles[i].name);

          break;
        }
      }
    }
  }

  getRoleList() {
    let access_token = this.localStorage.get("loggedInUserData").tokenData.access_token;
    this.roleService.getRoleListAPI(access_token).subscribe(
      (res: any) => {
        this.roles = res.object;
      },
      (err: any) => {

      }
    )
  }

  changeRole(role) {
    let access_token = this.localStorage.get("loggedInUserData").tokenData.access_token;
    console.log(role);
    /* this.currentUser.roles = [{id: 1, name: role, users: null}]; */
    console.log(this.currentUser)
    let payload = this.currentUser;
    this.userService.changeAdminRoleAPI(access_token, payload).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        $("#changeRoleModal").click();
        this.userEvent.next();
      },
      (err: any) => {
        this.toastr.error(err.message);
      }
    )
  }

}

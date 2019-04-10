import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from "jquery";
import { RoleService } from './../../Services/role.service';
import { LocalStorageService } from 'angular-web-storage'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @Input() addUserUsModal;
  @Input() roles;
  @Output() roleEvent = new EventEmitter<string>();
  userData: any = {};
  errordata: any = {};
  error: any = {};
  isLoaderStarted = false;

  constructor(
    private roleService: RoleService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
  }

  resetAddUserData() {
    $("#addUserForm").trigger('reset');
  }

  characterOnly(event): boolean {
    var keyCode = (event.which) ? event.which : event.keyCode
    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)
      return false;
    return true;
  }

  addUser() {
    let access_token = this.localStorage.get("loggedInUserData").tokenData.access_token;
    console.log(this.userData);
    this.isLoaderStarted = true;
    this.roleService.saveUserWithRoleAPI(access_token, this.userData).subscribe(
      (res: any) => {
        this.isLoaderStarted = false;
        $("#addUserUsModal").click();
        this.roleEvent.next();
      },
      (err: any) => {
        this.isLoaderStarted = false;
      }
    )
  }

  checkError() {
    $("#name").css("display", "block");
  }

}

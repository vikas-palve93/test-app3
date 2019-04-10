import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { OrganizationService } from './../../Services/organization.service';
import { UsersService } from './../../Services/users.service';
import * as $ from "jquery";
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'angular-web-storage'


@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {

  @Input() deleteConfirmationMode;
  @Input() deleteOrgObject;
  @Input() currentOrgName;
  @Output() orgEvent = new EventEmitter<string>();
  @Output() userEvent = new EventEmitter<string>();
  @Input() isOrgDeleteConfirmation;
  @Input() currentUser;
  @Input() currentUserName;
  isLoaderStarted = false;
  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private organizationService: OrganizationService,
    private userService: UsersService,
    private toastr: ToastrService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
  }

  deleteOrg() {
    let access_token = this.localStorage.get("loggedInUserData").tokenData.access_token;
    this.isLoaderStarted = true;
    console.log(this.deleteOrgObject)
    this.deleteOrgObject.isDeleted = true;
    let payload = this.deleteOrgObject;
    this.organizationService.updateOrgDetailsAPI(access_token, payload).subscribe(
      (res: any) => {
        $("#deleteConfirmationMode").click();
        this.isLoaderStarted = false;
        this.orgEvent.next();
      },
      (err: any) => {
        this.isLoaderStarted = false;
      }
    )
  }

  deleteUser(isActivated, isDeleted) {
    let access_token = this.localStorage.get("loggedInUserData").tokenData.access_token;
    this.isLoaderStarted = true;
    this.currentUser.deactivated = isActivated;
    this.currentUser.isDeactivateRequest = isActivated;
    this.currentUser.isDeleted = isDeleted;
    let payload = [this.currentUser];
    this.userService.updateUserAPI(access_token, payload).subscribe(
      (res: any) => {
        $("#deleteConfirmationMode").click();
        this.isLoaderStarted = false;
        this.userEvent.next();
        this.toastr.success(res.message);
      },
      (err: any) => {
        this.isLoaderStarted = false;
        this.toastr.error(err.message);
      }
    )
  }

  onPopUpClose() {
    this.isLoaderStarted = false;
  }

}

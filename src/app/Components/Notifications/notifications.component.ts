import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner'
import { NotificationsService } from './../../Services/notifications.service'
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notificationsData;
  userData: any = {};
  access_token


  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private notificationsService: NotificationsService,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userData = this.localStorage.get("loggedInUserData");
    if (this.userData === null || this.userData === undefined) {
      this.router.navigate(['login']);
    } else {
      this.access_token = this.localStorage.get("loggedInUserData").tokenData.access_token;
      this.getNotificationsList();
    }
  }

  getNotificationsList() {
    this.spinnerService.show();
    this.notificationsService.getNotificationListAPI(this.access_token).subscribe(
      (res: any) => {
        this.notificationsData = res.object.notificationList;
        this.spinnerService.hide();
      },
      (err: any) => {
        this.notificationsData = null;
        this.spinnerService.hide();
      }
    )
  }
}

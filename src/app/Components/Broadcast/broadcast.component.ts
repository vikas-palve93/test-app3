import { Component, OnInit } from '@angular/core';
import { BroadcastService } from './../../Services/broadcast.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner'
import * as $ from "jquery";
import { LocalStorageService } from 'angular-web-storage'
import { Router } from '@angular/router';


@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.css']
})
export class BroadcastComponent implements OnInit {

  broadcastData: any = {};
  data = null;
  urlData: any;
  errordata: any = {};
  error: any = {};
  instantiateSupportedAnimationDriver;
  userData = {};
  isRadio = true;
  access_token;

  constructor(
    private broadcastService: BroadcastService,
    private spinnerService: Ng4LoadingSpinnerService,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userData = this.localStorage.get("loggedInUserData");
    if (this.userData === null || this.userData === undefined) {
      this.router.navigate(['login']);
    } else {
      this.access_token = this.localStorage.get("loggedInUserData").tokenData.access_token;
      this.getUrlData();
      this.getBroadcastData();
      this.broadcastData.isAdmin = true;
    }
  }

  getUrlData() {
    this.spinnerService.show();
    this.broadcastService.getUrlDataAPI(this.access_token).subscribe(
      (res: any) => {
        this.urlData = res.object;
        this.spinnerService.hide();
      },
      (err: any) => {
        this.urlData = null;
        this.spinnerService.hide();
      }
    )
  }

  getBroadcastData() {
    this.spinnerService.show();
    this.broadcastService.getBroadcastDataAPI(this.access_token).subscribe(
      (res: any) => {
        this.data = res.object;
        this.spinnerService.hide();
      },
      (err: any) => {
        this.data = null;
        this.spinnerService.hide();
      }
    )
  }

  setFormData() {
    $("#btitle").css("display", "none");
    $("#bmessage").css("display", "none");
    $("#burl").css("display", "none");
  }
  checkError() {
    $("#bmessage").css("display", "block");
    $("#burl").css("display", "block");
  }

  saveBroadcastDetails() {
    console.log(this.broadcastData)
    this.spinnerService.show();
    this.broadcastService.saveBroadcastDetailsAPI(this.access_token, this.broadcastData).subscribe(
      (res: any) => {
        console.log(res);
        this.broadcastData = {};
        this.setFormData();
        this.getBroadcastData();
      },
      (err: any) => {
        console.log(err);
        this.spinnerService.hide();
      }
    )

  }

  changeRadio(value) {
    this.broadcastData.url = "";
    this.isRadio = value;
    console.log(this.isRadio);
  }

  whomeToSendNotification(value) {
    this.broadcastData.isAdmin = value;
    console.log(this.broadcastData.isAdmin);
  }

}

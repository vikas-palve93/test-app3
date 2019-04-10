import { Component, OnInit } from '@angular/core';
import { DatepickerOptions } from "ng2-datepicker";
import { PromoService } from './../../Services/promo.service'
import * as $ from "jquery";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-datespromo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {

  promoData: any = {};
  errordata: any = {};
  error: any = {};
  newPromoData: any = {};
  access_token;

  dates = {
    startDate: null,
    endDate: null,
    startDateStr: null

  };
  sDate = new Date();
  dd = this.sDate.setDate(this.sDate.getDate() - 1);
  startDateOptions: DatepickerOptions = {
    minYear: 2019,
    maxYear: new Date().getFullYear() + 1,
    displayFormat: "MM-DD-YYYY",
    barTitleFormat: "MMMM YYYY",
    dayNamesFormat: "dd",
    placeholder: "Start date",
    addClass: "custom-calender",
    fieldId: "start-date-picker",
    useEmptyBarTitle: false,
    minDate: new Date(this.dd),
  };
  endDateOptions: DatepickerOptions = {
    minYear: 2019,
    maxYear: new Date().getFullYear() + 1,
    displayFormat: "MM-DD-YYYY",
    barTitleFormat: "MMMM YYYY",
    minDate: new Date(Date.now()),
    dayNamesFormat: "dd",
    placeholder: "End date",
    addClass: "custom-calender",
    fieldId: "end-date-picker",
    useEmptyBarTitle: false,
  };

  constructor(
    private promoService: PromoService,
    private spinnerService: Ng4LoadingSpinnerService,
    private localStorage: LocalStorageService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    let userData = this.localStorage.get("loggedInUserData");
    if (userData === null || userData === undefined) {
      this.router.navigate(['login']);
    } else {
      this.access_token = this.localStorage.get("loggedInUserData").tokenData.access_token;
      this.getPromoData();
    }
  }

  setEndDateOptions(date) {
    if (date !== null) {
      this.endDateOptions.minDate = date;
    }
  }

  getPromoData() {
    this.spinnerService.show();
    this.promoService.getPromoDataAPI(this.access_token).subscribe(
      (res: any) => {
        console.log(res);
        this.promoData = res.object;
        this.spinnerService.hide();
      },
      (err: any) => {
        this.promoData = null;
        console.log(err);
        this.spinnerService.hide();
      }
    )
  }

  savePromoDetails() {
    this.spinnerService.show();
    console.log(this.newPromoData);
    this.promoService.savePromoDetailsAPI(this.access_token, this.newPromoData).subscribe(
      (res: any) => {
        console.log(res);
        this.getPromoData();
        this.resetFormData();
        this.spinnerService.hide();
      },
      (err: any) => {
        console.log(err);
        this.spinnerService.hide();
      }
    )
  }

  checkError() {
    $("#oMessage").css("display", "block");
    $("#oCode").css("display", "block");
    $("#oDesc").css("display", "block");
    $("#oStartDate").css("display", "block");
    $("#oEndDate").css("display", "block");
  }

  resetFormData() {
    this.promoData.msgTitle = "";
    $("#oMessage").css("display", "none", 'important');
    this.promoData.promoCode = "";
    $("#oCode").css("display", "none", 'important');
    this.promoData.message = "";
    $("#oDesc").css("display", "none", 'important');
    this.promoData.startDate = "";
    $("#oStartDate").css("display", "none", 'important');
    this.promoData.endDate = "";
    $("#oEndDate").css("display", "none", 'important');

  }

}

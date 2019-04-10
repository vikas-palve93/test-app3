import { Component, OnInit } from '@angular/core';
import { DatepickerOptions } from "ng2-datepicker";
import { Router } from '@angular/router'
import { LocalStorageService } from 'angular-web-storage'
import { OrganizationService } from './../../Services/organization.service'
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  data: any;
  public dataArray = [];
  access_token
  searchText;
  startDate;
  endDate;
  companyData;
  currentOrganization: any;
  currentIdexNumber: any;
  deleteOrgObject: any;
  currentOrgName: any;
  isOrgDeleteConfirmation = true;
  isFiltterApplied = false;
  page: number = 1;
  userData: any = {};
  filters: any = {};

  startDateOptions: DatepickerOptions = {
    minYear: 1970,
    maxYear: new Date().getFullYear() + 1,
    displayFormat: "MM-DD-YYYY",
    barTitleFormat: "MMMM YYYY",
    dayNamesFormat: "dd",
    placeholder: "Start date",
    addClass: "custom-calender",
    fieldId: "start-date-picker",
    useEmptyBarTitle: false,
    maxDate: new Date(),
  };
  endDateOptions: DatepickerOptions = {
    minYear: 1970,
    maxYear: new Date().getFullYear() + 1,
    displayFormat: "MM-DD-YYYY",
    barTitleFormat: "MMMM YYYY",
    maxDate: new Date(),
    dayNamesFormat: "dd",
    placeholder: "End date",
    addClass: "custom-calender",
    fieldId: "end-date-picker",
    useEmptyBarTitle: false,
  };

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private organizationService: OrganizationService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.userData = this.localStorage.get("loggedInUserData");
    if (this.userData === null || this.userData === undefined) {
      this.router.navigate(['login']);
    } else {
      this.access_token = this.localStorage.get("loggedInUserData").tokenData.access_token;
      this.getOrganizationList(1);
    }
  }

  onScroll() {
    console.log('scrolled!!');
    this.page = this.page + 1;
    if (this.isFiltterApplied) {
      this.getOrganizationListByFilter(this.page);
    } else {
      this.getOrganizationList(this.page);
    }
  }

  setEndDateOptions(date) {
    if (date !== null) {
      this.endDateOptions.minDate = date;
    }
  }

  getOrganizationList(page) {

    if (page === 1) {
      this.data = undefined;
      this.dataArray = [];
    }
    this.isFiltterApplied = false;
    this.filters.startDate = "";
    this.filters.endDate = "";
    let payload = {
      "startDate": null,
      "endDate": null
    }
    this.spinnerService.show();
    this.organizationService.getOrganizationListAPI(this.access_token, page, payload).subscribe(
      (res: any) => {
        console.log(res);
        for (let i = 0; i < res.object.length; i++) {
          res.object[i].isLoaderStarted = false;
        }
        this.dataArray = this.dataArray.concat(res.object)
        this.data = this.dataArray;
        console.log(this.data);
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  getOrganizationListByFilter(page) {
    this.isFiltterApplied = true;
    if (page === 1) {
      this.data = undefined;
      this.dataArray = [];
    }
    console.log(this.filters.startDate, this.filters.endDate)
    this.spinnerService.show();
    this.organizationService.getOrganizationListByFilterAPI(this.access_token, page, this.filters).subscribe(
      (res: any) => {
        console.log(res);
        for (let i = 0; i < res.object.length; i++) {
          res.object.push({ "isLoaderStarted": false })
        }
        this.dataArray = this.dataArray.concat(res.object)
        this.data = this.dataArray;
        console.log(this.data);
        this.spinnerService.hide();
      },
      (err: any) => {
        console.log(err);
        this.spinnerService.hide();
      }
    )
  }

  orgznizationDetails(org) {
    console.log(org);
    this.localStorage.set("organizationData", org)
    this.localStorage.set("organizationAdminData", org.adminDetails)
    this.localStorage.set("currentSelectedOrganization", org.orgName)
    this.router.navigate(['settings/organization']);

  }

  updateOrganization(org, isActive, index) {
    let payload = org.companyModel;
    payload.isActive = isActive;
    document.getElementById("orgPopoverActions").parentElement.click();
    this.data[index].isLoaderStarted = true;
    this.organizationService.suspenDeleteOrg(this.access_token, payload).subscribe(
      (res: any) => {
        this.data[index].companyModel.isActive = isActive;
        this.data[index].isLoaderStarted = false;
      },
      (err: any) => {
        this.data[index].isLoaderStarted = false;
      }
    )
  }

  onClickPopoverClose() {
    document.getElementById("orgPopoverActions").parentElement.click();
  }
  
}

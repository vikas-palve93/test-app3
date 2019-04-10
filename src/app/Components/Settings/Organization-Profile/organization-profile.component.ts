import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "angular-web-storage";
import { countries } from '../../../Util/countries';
import * as $ from "jquery";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { OrganizationService } from './../../../Services/organization.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.css']
})
export class OrganizationProfileComponent implements OnInit {

  errordata:any={};
  error: any={};
  orgName;
  orgWebsite;
  orgContact;
  orgAddress;
  orgCity;
  orgState;
  orgCountry;
  orgZipcode;
  countryCode;
  companyData;
  orgProfileImage
  countries = countries;
  companyDataModal;
  isFieldChange = false;
  access_token;

  constructor(
    private localStorage: LocalStorageService,
    private spinnerService: Ng4LoadingSpinnerService,
    private organizationService : OrganizationService,
    private router:Router
  ) {
  }
  
  ngOnInit() {
    let userData = this.localStorage.get("loggedInUserData");
    if(userData === null || userData === undefined){
      this.router.navigate(['login']);
    } else{
    this.access_token = this.localStorage.get("loggedInUserData").tokenData.access_token;
    this.companyDataModal = this.localStorage.get("organizationData");
    this.companyData = this.companyDataModal.companyModel;
    console.log(this.companyData);
    this.orgName = this.companyData.name;
    this.orgWebsite = this.companyData.websiteUrl;
    this.orgContact = this.companyData.contactNo;
    this.orgAddress = this.companyData.address;
    this.orgCity = this.companyData.city;
    this.orgState = this.companyData.state;
    this.orgCountry = this.companyData.country;
    this.countryCode = this.companyData.countryCode;
    this.orgZipcode = this.companyData.zipCode;
    this.orgProfileImage = "https://s3-us-west-2.amazonaws.com/dev-codegrip-images/Default+profile+images/Company_1.svg";
    /* this.orgProfileImage = this.companyData.companyLogoUrl; */
    }
  }

  setCountryCode(countryName){
    let countryObj = countries.find(function(element) {
      return element.name === countryName;
    });
    if(countryObj !== undefined){
      this.companyData.countryCode = countryObj.code;
    }else {
      this.countryCode = null;
    }
  }

  checkError(){
    $("#oName").css("display", "block");
    $("#oZipcode").css("display", "block");
    $("#oState").css("display", "block");
    $("#oCity").css("display", "block");
    $("oAddress").css("display", "block");
    $("#oAddress").css("display", "block");
  }

  onInputFieldChange(changedData){
    console.log(changedData)
    let prevData = this.localStorage.get("organizationData");
    console.log(prevData)
    if(changedData.orgName !== prevData.companyModel.orgName ){
      this.isFieldChange = true;
    }
    else if(changedData.orgWebsite !== prevData.companyModel.orgWebsite ){
      this.isFieldChange = true;
    }
    else if(changedData.orgAddress !== prevData.companyModel.orgAddress ){
      this.isFieldChange = true;
    }
    else if(changedData.orgCity !== prevData.companyModel.orgCity ){
      this.isFieldChange = true;
    }
    else if(changedData.orgState !== prevData.companyModel.orgState ){
      this.isFieldChange = true;
    }
    else if(changedData.orgCountry !== prevData.companyModel.orgCountry ){
      this.isFieldChange = true;
    }
    else if(changedData.orgZipCode !== prevData.companyModel.orgZipCode ){
      this.isFieldChange = true;
    }
    else if(changedData.orgContact !== prevData.companyModel.orgContact ){
      this.isFieldChange = true;
    }
    else {
      this.isFieldChange = false;
    }
  }

  setOrgData(){
    let companyData1 = this.localStorage.get("organizationData");
    console.log(companyData1)
     if(companyData1.companyModel.name == null){
       this.companyData.name="";
       $("#oName").css("display", "none");
    }else{
       this.companyData.name = companyData1.companyModel.name;
    }
    this.companyData.websiteUrl = companyData1.companyModel.websiteUrl;
    this.companyData.contactNo = companyData1.companyModel.contactNo;
    if(this.companyData.address == null){
      $("#oAddress").css("display", "none");
    }else{
      this.companyData.address = companyData1.companyModel.address;
    }
    if(companyData1.companyModel.city != null){
      this.companyData.city = companyData1.companyModel.city;
    }else{
      $("#oCity").css("display", "none");
    }
    if(companyData1.companyModel.state != null){
      this.companyData.state = companyData1.companyModel.state;
    }else{
      $("#oState").css("display", "none");
    }
    if(companyData1.companyModel.country != null){
      this.companyData.country = companyData1.companyModel.country;
    }else{
      $("#oCountry").css("display", "none");
    }
    if(companyData1.companyModel.zipCode != null){
      this.companyData.zipCode = companyData1.companyModel.zipCode;
    }else{
      $("#oZipcode").css("display", "none");
    }
    this.companyData.countryCode = companyData1.companyModel.countryCode;
    if(companyData1.companyModel.companyLogoUrl != null){
      this.companyData.companyLogoUrl = companyData1.companyModel.companyLogoUrl;
    }else{
      this.companyData.companyLogoUrl = "https://s3-us-west-2.amazonaws.com/dev-codegrip-images/Default+profile+images/Company_1.svg";
    }
    
  }

  updateOrgProfile(){
    console.log(this.companyData)
    this.spinnerService.show();
    this.organizationService.updateOrgDetailsAPI(this.access_token, this.companyData).subscribe(
      (res: any)=>{
        console.log(res)
        this.spinnerService.hide();
      },
      (err:any)=>{
        console.log(err)
        this.spinnerService.hide();
      }
    )
  }

  characterOnly(event): boolean {
    var keyCode = (event.which) ? event.which : event.keyCode
    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)
      return false;
    return true;
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}

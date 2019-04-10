import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { LoginService } from './../../Services/login.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginData:any = {};  
  errordata: any = {};
  error: any = {};
  loggedInUserData: any = {};
  isError = false;
  isLoaderStarted = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private localStorage: LocalStorageService,
    private permissionsService: NgxPermissionsService,
  ) { }

  ngOnInit() {
  }

  login(){
    console.log(this.loginData)
    this.isLoaderStarted = true;
    this.loginService.loginAPI(this.loginData).subscribe(
      (res:any)=>{
        this.loggedInUserData = res.object;
        const perm = [this.loggedInUserData.userDetails.roles[0].name];
        console.log(perm)
        this.permissionsService.loadPermissions(perm);
        this.localStorage.set("loggedInUserData", this.loggedInUserData)
        this.isLoaderStarted = false;
        this.isError = false;
        this.loginData = {};        
        $("#email").css("display", "none");
        $("#password").css("display", "none");
        this.router.navigate(['dashboard']);
      },
      (err:any)=>{
        this.isError = true;
        this.isLoaderStarted = false;
      }
    )
  }

  checkError() {
    $("#email").css("display", "block");
    $("#password").css("display", "block");
  }

  hideError(){
    this.isError = false;
  }
}

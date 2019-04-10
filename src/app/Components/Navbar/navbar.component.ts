import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage'
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  notifications = null;
  link;
  loggedInUserData: any = {};
  role;
  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
  ) { }

  ngOnInit() {
    let userData = this.localStorage.get("loggedInUserData");
    if (!userData.userDetails) {
      this.router.navigate(['login']);
    }
    else {
      console.log(userData)
      this.role = userData.userDetails.roles[0].value;
      this.loggedInUserData = userData.userDetails;
    }
  }

  logout() {
    this.localStorage.clear();
    this.router.navigate(['login']);
    console.log(this.localStorage.get("loggedInUserData"));
  }
}

import { Component, OnInit } from '@angular/core';
import { plans, features, support } from '../../Util/plans';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  plans = plans;
  features = features;
  support = support;
  userData: any = {};

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userData = this.localStorage.get("loggedInUserData");
    if (this.userData === null || this.userData === undefined) {
      this.router.navigate(['login']);
    }
  }

}

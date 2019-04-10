import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage'

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css']
})
export class SettingsMenuComponent implements OnInit {

  currentSelectedOrgName: any;
  constructor(
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    if (this.localStorage.get("currentSelectedOrganization")) {
      this.currentSelectedOrgName = this.localStorage.get("currentSelectedOrganization")
      console.log(this.currentSelectedOrgName);

    }
    else {
      this.currentSelectedOrgName = '';
    }
  }

}

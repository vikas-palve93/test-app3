import { Component } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { LocalStorageService } from 'angular-web-storage';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  template: string =`<img src="assets/Loader/loader.gif" style="height: 50% !important; width: 50% !important; top: 26% !important; left: 24% !important;">`;
  userData : any={};
  constructor(
    private permissionsService: NgxPermissionsService,
    private localStorage: LocalStorageService,
    private router: Router,
    ){}

  ngOnInit(): void {
    this.userData = this.localStorage.get("loggedInUserData");
        if(this.userData === null || this.userData === undefined){
/*           const perm = ['ROLE_SUPER_ADMIN'];
          const perm = ['ROLE_MARKETING'];
          console.log(perm)
          this.permissionsService.loadPermissions(perm);
          this.router.navigate(['login']); */
        }else{
          const perm = [this.userData.userDetails.roles[0].name];
          console.log(perm)
          this.permissionsService.loadPermissions(perm);
        }
      }

}

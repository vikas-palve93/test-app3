import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { post } from 'selenium-webdriver/http';
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient
  ) { }

  getUserRoleListAPI(access_token) {
    return this.http.get(environment.BaseURL + "role/super-admin-user-list?access_token=" + access_token);
  }

  getRoleListAPI(access_token) {
    return this.http.get(environment.BaseURL + "role/super-admin-role-list?access_token=" + access_token);
  }

  saveUserWithRoleAPI(access_token, payload) {
    return this.http.post(environment.BaseURL + "role/assign-role-to-user?access_token=" + access_token, payload);
  }
}

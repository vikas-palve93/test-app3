import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from } from 'rxjs';
import { environment } from './../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUserListAPI(access_token, companyId) {
    let payload = ["ROLE_USER", "ROLE_ADMIN"];
    return this.http.post(environment.BaseURL + "orgnization/get-user-list-by-org/" + companyId + "/ALL?access_token=" + access_token, payload);
  }

  updateUserAPI(access_token, payload) {
    return this.http.post(environment.BaseURL + "orgnization/update-user?access_token=" + access_token, payload);
  }

  changeAdminRoleAPI(access_token, payload) {
    return this.http.post(environment.BaseURL + "role/change-super-user-role?access_token=" + access_token, payload);
  }

  changeUserRoleAPI(access_token, payload) {
    return this.http.post(environment.BaseURL + "orgnization/change-role?access_token=" + access_token, payload);
  }

  getReferredUserListAPI() {
    return this.http.get("http://www.mocky.io/v2/5c9dc70733000086463f248d");
  }
}

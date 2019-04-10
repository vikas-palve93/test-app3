import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from './../../environments/environment'
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(
    private http: HttpClient
  ) { }

  getOrganizationListAPI(access_token, page, payload) {
    return this.http.post(environment.BaseURL + "orgnization/get-organization-list/" + page + "?access_token=" + access_token, payload);
  }

  getOrganizationListByFilterAPI(access_token, page, payload) {
    return this.http.post(environment.BaseURL + "orgnization/get-organization-list/" + page + "?access_token=" + access_token, payload);
  }

  updateOrgDetailsAPI(access_token, payload) {
    return this.http.post(environment.BaseURL + "orgnization/update-company?access_token=" + access_token, payload);
  }

  suspenDeleteOrg(access_token, payload) {
    return this.http.post(environment.BaseURL + "orgnization/update-company?access_token=" + access_token, payload);
  }
}

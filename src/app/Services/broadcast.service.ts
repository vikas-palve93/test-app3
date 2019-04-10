import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from './../../environments/environment'
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  constructor(
    private http: HttpClient
  ) { }

  getBroadcastDataAPI(access_token) {
    return this.http.get(environment.BaseURL + "broadcast/get-broadcast-list?access_token=" + access_token);
  }

  getUrlDataAPI(access_token) {
    return this.http.get(environment.BaseURL + "broadcast/get-url-list?access_token=" + access_token);
  }
  saveBroadcastDetailsAPI(access_token, payload) {
    return this.http.post(environment.BaseURL + "broadcast/add-broadcast?access_token=" + access_token, payload)
  }
}

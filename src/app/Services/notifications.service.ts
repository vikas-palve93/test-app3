import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private http: HttpClient
  ) { }

  getNotificationListAPI(access_token) {
    return this.http.get(environment.BaseURL + "?access_token=" + access_token);
  }
}

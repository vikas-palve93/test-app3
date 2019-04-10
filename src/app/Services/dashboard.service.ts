import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  dashboardDataAPI(access_token, ) {
    return this.http.get(environment.BaseURL + "dashboard/get-dashboard-details?access_token=" + access_token);
  }
}

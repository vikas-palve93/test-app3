import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from './../../environments/environment'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor(
    private http: HttpClient
  ) { }

  getPromoDataAPI(access_token) {
    return this.http.get(environment.BaseURL + "promocode/get-promocode-list?access_token=" + access_token);
  }

  savePromoDetailsAPI(access_token, payload) {
    return this.http.post(environment.BaseURL + "promocode/add-promo-code?access_token=" + access_token, payload)
  }
}

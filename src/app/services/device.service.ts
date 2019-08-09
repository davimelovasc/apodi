import { Injectable } from '@angular/core';
import { Constants } from '../models/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {


  constructor(private http: HttpClient) { }

  getByQRCode(id, user_token) {
    //TODO GET TOKEN HERE
    const headers = {
      'Authorization': user_token
    };

    return this.http.get(`${Constants.BASE_API_URL}/components/qrcode/${id}`, {headers: headers}).toPromise()
  }

}

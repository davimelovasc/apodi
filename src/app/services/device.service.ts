import { Injectable } from '@angular/core';
import { Constants } from '../models/constants';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {


  constructor(private http: HttpClient, private storage: Storage) { }

  async getByQRCode(id) {
    let userToken = await this.storage.get('token')
    const headers = {
      'Authorization': userToken
    };

    return this.http.get(`${Constants.BASE_API_URL}/components/qrcode/${id}`, {headers: headers}).toPromise()
  }

  async getById(id) {
    let userToken = await this.storage.get('token')
    const headers = {
      'Authorization': `${userToken}`
    }

    return this.http.get(`${Constants.BASE_API_URL}/components/${id}`, {headers: headers}).toPromise()
  }

  async getAlertedComponents() {
    let userToken = await this.storage.get('token')
    const headers = {
      'Authorization': `${userToken}`
    }

    return this.http.get(`${Constants.BASE_API_URL}/parameters/alertedParameters`, {headers: headers}).toPromise()
  }


}

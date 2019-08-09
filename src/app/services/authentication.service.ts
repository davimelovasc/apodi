import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { Constants } from '../models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const TOKEN_KEY = 'auth-token'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false)

  constructor(private storage: Storage, private plt: Platform, private  http : HttpClient) { 
    this.plt.ready().then(() => {
      this.checkToken();
    })
  }


  login(username, password) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Authorization': 'Basic c2lhcmFfZnJvbnQ6czFAckBfczNjcjN0'
    };

    let body = `grant_type=password&username=${username}&password=${password}`;
    
    return this.http.post(`${Constants.BASE_API_URL}/oauth/token`, body, {headers: headers}).toPromise();
  }

  logout() {
    let promises = [
      this.storage.remove('token'),
      this.storage.remove('refresh-token')
    ]
    return Promise.all(promises).then(res => {
      this.authenticationState.next(false)
    })
  }

  isAuthenticated() {
    return this.authenticationState.value
  }

  checkToken() {
    return this.storage.get('token').then( res => {
      if(res) {
        this.authenticationState.next(true)
      }
      
    })
  }

}

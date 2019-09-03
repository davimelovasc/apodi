import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, MenuController, ToastController } from '@ionic/angular';
import { ForgotPassComponent } from 'src/app/components/forgot-pass/forgot-pass.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@ionic/storage';
import { Constants } from 'src/app/models/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    registry: "",
    password: ""
  }

  constructor(private router: Router, private modalCtrl: ModalController, private menuCtrl: MenuController, private authService: AuthenticationService,
    private storage: Storage, public toastController: ToastController) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.user.registry, this.user.password).then( res => {

      let storegesPromises = [
        this.storage.set('token', `Bearer ${res['access_token']}`),
        this.storage.set('refresh-token', res['refresh_token'])
      ]
      
      Promise.all(storegesPromises).then(data => {
        this.authService.authenticationState.next(true)
        this.router.navigate(["dashboard/Mapa"]);
      })

    },
    err => {
      if(err.status == 400)
        this.presentToast('Matrícula ou senha inválida')
      else if(err.status == 0)
        this.presentToast('Erro ao tentar se conectar com o servidor.')
      
    })
  }

  async showPassModal() {
    const modal = await this.modalCtrl.create({
      component: ForgotPassComponent,
      cssClass: 'forgotPassModal'
    });

    await modal.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: 'dangerToast',
      position: 'top'
    });
    toast.present();
  }


}

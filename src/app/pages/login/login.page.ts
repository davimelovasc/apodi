import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ForgotPassComponent } from 'src/app/components/forgot-pass/forgot-pass.component';

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

  constructor(private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  login() {
    console.log("Matrícula: " + this.user.registry);
    console.log("Password: " + this.user.password);
  }

  async showPassModal() {
    const modal = await this.modalCtrl.create({
      component: ForgotPassComponent
    });

    await modal.present();
  }


}

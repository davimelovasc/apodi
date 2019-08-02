import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, MenuController } from '@ionic/angular';
import { ForgotPassComponent } from 'src/app/components/forgot-pass/forgot-pass.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

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

  constructor(private router: Router, private modalCtrl: ModalController, private menuCtrl: MenuController, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  login() {
    console.log("Matrícula: " + this.user.registry);
    console.log("Password: " + this.user.password);
    // BACKTODO (call login route)
    //this.menuCtrl.enable(true);
    this.authService.login().then(res => {
      console.log(res)
    },
    err => {
      console.error(err)
    })
    

    //this.router.navigate(["dashboard/Mapa"]);
  }

  async showPassModal() {
    const modal = await this.modalCtrl.create({
      component: ForgotPassComponent,
      cssClass: 'forgotPassModal'
    });

    await modal.present();
  }


}

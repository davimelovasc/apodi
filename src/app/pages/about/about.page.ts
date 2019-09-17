import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Constants } from 'src/app/models/constants';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  async presentSetIpAndPortPrompt() {
    const alert = await this.alertController.create({
      header: 'Endereço IP e porta da API:',
      inputs: [
        {
          name: 'ip',
          type: 'text',
          placeholder: 'Ex.: 192.168.0.110'
        },
        {
          name: 'port',
          type: 'text',
          placeholder: 'Ex.: 8080'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss()
          }
        }, {
          text: 'Ok',
          handler: (data) => {

            Constants.BASE_API_URL = `http://${data.ip}:${data.port}`
            alert.dismiss()
          }
        }
      ]
    });
    
    await alert.present();

  }

}

import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {


  // TODO substituir pelos ids
  CY01 = "ciclone01";
  FORNO = "PD1";
  MANCAL_B11 = "MANCALB11"

  public appPages = [
    {
      title: 'Mapa',
      url: '/dashboard',
    },
    {
      title: 'Forno e mancais',
      children: [ 
        {
          title: 'Forno e mancais',
          url: `/device-details/${this.FORNO}`
        },
        {
          title: 'Mancal B11',
          url: `/device-details/${this.MANCAL_B11}`
        },
        {
          title: 'Mancal B12',
          url: `/device-details/${this.MANCAL_B11}`
        },
        {
          title: 'Mancal B13',
          url: `/device-details/${this.MANCAL_B11}`
        },
        {
          title: 'Mancal B14',
          url: `/device-details/${this.MANCAL_B11}`
        },
        {
          title: 'Mancal B21',
          url: `/device-details/${this.MANCAL_B11}`
        },
        {
          title: 'Mancal B22',
          url: `/device-details/${this.MANCAL_B11}`
        },
        {
          title: 'Mancal B23',
          url: `/device-details/${this.MANCAL_B11}`
        },
        {
          title: 'Mancal B24',
          url: `/device-details/${this.MANCAL_B11}`
        },
        {
          title: 'Mancal B31',
          url: `/device-details/${this.MANCAL_B11}`
        },
        {
          title: 'Mancal B32',
          url: `/device-details/${this.MANCAL_B11}`
        },
        {
          title: 'Mancal B33',
          url: `/device-details/${this.MANCAL_B11}`
        },
        {
          title: 'Mancal B34',
          url: `/device-details/${this.MANCAL_B11}`
        },
        {
          title: 'Primeira Aliança',
          url: `/device-details/${this.MANCAL_B11}`
        },
        {
          title: 'Uni. de lubrificação da coroa',
          url: `/device-details/${this.MANCAL_B11}`
        }
      ]
    },
    {
      title: 'Motor do forno',
      url: `/device-details/${this.MANCAL_B11}`
    },
    {
      title: 'Arrastador',
      url: `/device-details/${this.MANCAL_B11}`
    },
    {
      title: 'Resfriador',
      
      url: `/device-details/${this.MANCAL_B11}`
    },
    {
      title: 'Maçarico principal',
      url: `/device-details/${this.MANCAL_B11}`
    },
    {
      title: 'Ventiladores do resfriador',
      
      children: [
        {
          title: 'FN 7',
          url: `/device-details/${this.CY01}`
        },
        {
          title: 'FN 5',
          url: `/device-details/${this.CY01}`
        },
        {
          title: 'FN 6',
          url: `/device-details/${this.CY01}`
        },
        {
          title: 'FN 8',
          url: `/device-details/${this.CY01}`
        },
        {
          title: 'FN 9',
          url: `/device-details/${this.CY01}`
        },
        {
          title: 'FN 10',
          url: `/device-details/${this.CY01}`
        },
        {
          title: 'FN 11',
          url: `/device-details/${this.CY01}`
        },
        {
          title: 'FN 12',
          url: `/device-details/${this.CY01}`
        }
      ]
    },
    {
      title: 'Britador de rolos',
      url: `/device-details/${this.MANCAL_B11}`
    },
    {
      title: 'Ventilador de ar da co-geração',
      url: `/device-details/${this.MANCAL_B11}`
    },
    {
      title: 'Cabeçote',
      url: `/device-details/${this.MANCAL_B11}`
    },
    {
      title: 'Ciclones',
      
      children: [ 
        {
          title: 'Ciclone 1',
          url: `/device-details/${this.CY01}`
        },
        {
          title: 'Ciclone 2',
          url: `/device-details/${this.CY01}`
        },
        {
          title: 'Ciclone 3',
          url: `/device-details/${this.CY01}`
        },
        {
          title: 'Ciclone 4',
          url: `/device-details/${this.CY01}`
        },
        {
          title: 'Ciclone 5',
          url: `/device-details/${this.CY01}`
        }
      ]
    },
    {
      title: 'Ventilador da torre de ciclones',
      url: `/device-details/${this.MANCAL_B11}`
    },
    {
      title: 'Calcinador',
      url: `/device-details/${this.MANCAL_B11}`
    },
    {
      title: 'Caixa de fumaça',
      url: `/device-details/${this.MANCAL_B11}`
    },
    {
      title: 'Analisador de gases da saída da torre',
      url: `/device-details/${this.MANCAL_B11}`
    },
    {
      title: 'Duto de ar terciário',
      url: `/device-details/${this.MANCAL_B11}`
    },
    {
      title: 'Duto de ar terciário',
      url: `/device-details/${this.MANCAL_B11}`
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
    // check user is logged in
      // if false
    this.menuCtrl.enable(false);
    this.router.navigateByUrl('/login');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      
    });
  }

}

import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Constants } from './models/constants';
import { FakeRequests } from './models/fakeRequests';
import { MenuSubItem } from './models/menuSubItem';
import { MenuItem } from './models/menuItem';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public alertedComponents: Array<String> = new Array<String>();

  public appPages = [];
    // {
    //   title: 'Dashboard',
    //   url: '/dashboard',
    // },
    // {
    //   title: 'Forno e mancais',
    //   children: [ 
    //     {
    //       title: 'Forno',
    //       url: `/device-details/${this.FORNO}`
    //     },
    //     {
    //       title: 'Mancal B11',
    //       url: `/device-details/${this.MANCAL_B11}`
    //     },
    //     {
    //       title: 'Mancal B12',
    //       url: `/device-details/${this.MANCAL_B11}`
    //     },
    //     {
    //       title: 'Mancal B13',
    //       url: `/device-details/${this.MANCAL_B11}`
    //     },
    //     {
    //       title: 'Mancal B14',
    //       url: `/device-details/${this.MANCAL_B11}`
    //     },
    //     {
    //       title: 'Mancal B21',
    //       url: `/device-details/${this.MANCAL_B11}`
    //     },
    //     {
    //       title: 'Mancal B22',
    //       url: `/device-details/${this.MANCAL_B11}`
    //     },
    //     {
    //       title: 'Mancal B23',
    //       url: `/device-details/${this.MANCAL_B11}`
    //     },
    //     {
    //       title: 'Mancal B24',
    //       url: `/device-details/${this.MANCAL_B11}`
    //     },
    //     {
    //       title: 'Mancal B31',
    //       url: `/device-details/${this.MANCAL_B11}`
    //     },
    //     {
    //       title: 'Mancal B32',
    //       url: `/device-details/${this.MANCAL_B11}`
    //     },
    //     {
    //       title: 'Mancal B33',
    //       url: `/device-details/${this.MANCAL_B11}`
    //     },
    //     {
    //       title: 'Mancal B34',
    //       url: `/device-details/${this.MANCAL_B11}`
    //     },
    //     {
    //       title: 'Primeira Aliança',
    //       url: `/device-details/${this.MANCAL_B11}`
    //     },
    //     {
    //       title: 'Uni. de lubrificação da coroa',
    //       url: `/device-details/${this.MANCAL_B11}`
    //     }
    //   ]
    // },
    // {
    //   title: 'Motor do forno',
    //   url: `/device-details/${this.MANCAL_B11}`
    // },
    // {
    //   title: 'Arrastador',
    //   url: `/device-details/${this.MANCAL_B11}`
    // },
    // {
    //   title: 'Resfriador',
      
    //   url: `/device-details/${this.MANCAL_B11}`
    // },
    // {
    //   title: 'Maçarico principal',
    //   url: `/device-details/${this.MANCAL_B11}`
    // },
    // {
    //   title: 'Ventiladores do resfriador',
      
    //   children: [
    //     {
    //       title: 'FN 7',
    //       url: `/device-details/${this.CY01}`
    //     },
    //     {
    //       title: 'FN 5',
    //       url: `/device-details/${this.CY01}`
    //     },
    //     {
    //       title: 'FN 6',
    //       url: `/device-details/${this.CY01}`
    //     },
    //     {
    //       title: 'FN 8',
    //       url: `/device-details/${this.CY01}`
    //     },
    //     {
    //       title: 'FN 9',
    //       url: `/device-details/${this.CY01}`
    //     },
    //     {
    //       title: 'FN 10',
    //       url: `/device-details/${this.CY01}`
    //     },
    //     {
    //       title: 'FN 11',
    //       url: `/device-details/${this.CY01}`
    //     },
    //     {
    //       title: 'FN 12',
    //       url: `/device-details/${this.CY01}`
    //     }
    //   ]
    // },
    // {
    //   title: 'Britador de rolos',
    //   url: `/device-details/${this.MANCAL_B11}`
    // },
    // {
    //   title: 'Ventilador de ar da co-geração',
    //   url: `/device-details/${this.MANCAL_B11}`
    // },
    // {
    //   title: 'Cabeçote',
    //   url: `/device-details/${this.MANCAL_B11}`
    // },
    // {
    //   title: 'Ciclones',
      
    //   children: [ 
    //     {
    //       title: 'Ciclone 1',
    //       url: `/device-details/${this.CY01}`
    //     },
    //     {
    //       title: 'Ciclone 2',
    //       url: `/device-details/${this.CY01}`
    //     },
    //     {
    //       title: 'Ciclone 3',
    //       url: `/device-details/${this.CY01}`
    //     },
    //     {
    //       title: 'Ciclone 4',
    //       url: `/device-details/${this.CY01}`
    //     },
    //     {
    //       title: 'Ciclone 5',
    //       url: `/device-details/${this.CY01}`
    //     }
    //   ]
    // },
    // {
    //   title: 'Ventilador da torre de ciclones',
    //   url: `/device-details/${this.MANCAL_B11}`
    // },
    // {
    //   title: 'Calcinador',
    //   url: `/device-details/${this.MANCAL_B11}`
    // },
    // {
    //   title: 'Caixa de fumaça',
    //   url: `/device-details/${this.MANCAL_B11}`
    // },
    // {
    //   title: 'Analisador de gases da saída da torre',
    //   url: `/device-details/${this.MANCAL_B11}`
    // },
    // {
    //   title: 'Duto de ar terciário',
    //   url: `/device-details/${this.MANCAL_B11}`
    // }
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menuCtrl: MenuController,
    private storage: Storage
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

      let menuItems = FakeRequests.loginRequest(); // REQUEST_TODO
      menuItems = menuItems.components;

      for(let i = 0; i < menuItems.length; i++) {
        if(menuItems[i].subcomponents) {
          let menuItem = {title: menuItems[i].name, seq: menuItems[i].seq, alerted: false, children: []}
          
          for(let j=0; j < menuItems[i].subcomponents.length; j++) {
            let subItem = menuItems[i].subcomponents[j];
            menuItem.children.push({id: subItem.id, title: subItem.name, seq: subItem.seq, alerted: subItem.alerted, url: `/device-details/${subItem.id}`} );
            if(subItem.alerted == true) {
              menuItem.alerted = true;
              this.alertedComponents.push(subItem.id);
            }
            this.storage.set(subItem.id, subItem);
          }
          this.appPages.push(menuItem);
          //this.storage.set(menuItem.title, menuItem);

        } else {
          let menuItem = {id: menuItems[i].id, title: menuItems[i].name, seq: menuItems[i].seq, alerted: menuItems[i].alerted, url: `/device-details/${menuItems[i].id}`}
          this.appPages.push(menuItem);

          if(menuItem.alerted == true) this.alertedComponents.push(menuItem.id);
          this.storage.set(menuItem.id, menuItem);
        }
      }

      this.appPages = this.appPages.sort(MenuItem.compare); 

    });

    
  }

  isAlerted(id) {
    if(this.alertedComponents.includes(id))
      return true;
    else
      return false;
   
  }

  childrenWithAlert(children: Array<any>): boolean {
    let alerted = false;
    
    children.forEach(c => {
      if(this.alertedComponents.includes(c.id)) {
       alerted = true;
      }
    });
    return alerted;
  }

  logout() {
    //invalid token request
    this.router.navigateByUrl('/login');
    this.menuCtrl.enable(false);
  }

}

import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, MenuController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Constants } from './models/constants';
import { FakeRequests } from './models/fakeRequests';
import { MenuSubItem } from './models/menuSubItem';
import { MenuItem } from './models/menuItem';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public alertedComponents: Array<String> = new Array<String>();

  public appPages = [];
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menuCtrl: MenuController,
    private storage: Storage,
    private authenticationService: AuthenticationService,
    public toastController: ToastController
  ) {
    this.initializeApp();
    setTimeout(() => {
      this.createAlertMessage("CY01", "Ciclone 01") //just for test
    }, 3000)
    // check user is logged in
      // if false
    //this.menuCtrl.enable(false);
    //this.router.navigateByUrl('/login');

    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.menuCtrl.enable(true)
          this.router.navigate(['dashboard/Mapa']);
        } else {
          this.menuCtrl.enable(false)
          this.router.navigate(['login']);
        }
      });

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
    this.authenticationService.logout()
  }


  
  async createAlertMessage(component_id, component_name) {
    const toast = await this.toastController.create({
      header: 'Atenção',
      message: `O componente ${component_name} possui atributos com valores fora do recomendável`,
      position: 'top',
      cssClass: 'dangerToast',
      buttons: [
        {
          text: 'Verificar',
          cssClass: 'checkButton',
          handler: () => {
            this.router.navigateByUrl(`/device-details/${component_id}/${component_name}`)
            console.log('Verificar clicked');
          }
        }
        // }, {
        //   text: 'Dispensar',
        //   role: 'cancel',
        //   handler: () => {
        //     console.log('Dispensar clicked');
        //   }
        // }
      ]
    });
    toast.present();
  }

}

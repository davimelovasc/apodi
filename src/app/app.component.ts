import { Component } from '@angular/core';
import { Platform, MenuController, ToastController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Constants } from './models/constants';
import { MenuItem } from './models/menuItem';
import { AuthenticationService } from './services/authentication.service';
import { DeviceService } from './services/device.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public alertedComponents: Array<number> = new Array<number>();

  public appPages = [];
  public refreshIntervalId;
  public interval;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menuCtrl: MenuController,
    private authenticationService: AuthenticationService,
    public deviceService: DeviceService,
    public toastController: ToastController,
    public events: Events,
    public alertController: AlertController
  ) {
    this.initializeApp();
    this.authenticationService.authenticationState.subscribe(state => {
      if (state) {
        this.interval = setInterval(() => {this.getAndSaveAlertedComponents()}, Constants.WATCHING_TIME)
      }
    })
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      this.authenticationService.authenticationState.subscribe(state => {
        if (state) { 
          this.fillSideMenu()
          this.menuCtrl.enable(true)
          this.router.navigate(['dashboard/Mapa'])

        } else {
          this.presentSetIpAndPortPrompt()
          this.menuCtrl.enable(false)
          this.router.navigate(['login']);


        }
      });
    });
  
  }

  isAlerted(id) {
    if(this.alertedComponents.includes(id))
      return true
    else
      return false
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
    this.stopGetAlertedComponents(this.interval)
    this.authenticationService.logout()
  }

  getAndSaveAlertedComponents(retry: boolean = true) {
    this.deviceService.getAlertedComponents().then(res => {
      if (res instanceof Array) {
        
        const resIds = res.map(comp => { return comp.id })

        this.alertedComponents = this.alertedComponents.filter( id => { return (resIds.indexOf(id) == -1 ? false : true) }) //remove os elementos que nao estão mais em alertas
        resIds.map( id => {
          if(this.alertedComponents.indexOf(id) == -1) {
            this.alertedComponents.push(id) //novo elemento
            this.createAlertMessage()

          }
        })
        this.events.publish('alerted-components:update', this.alertedComponents)

      }
      
    }, err => {
      if(err.status === 401 && retry) { //token invalida, refresh
        this.authenticationService.refreshToken().then( res => {
          return this.getAndSaveAlertedComponents(false)
        })
      } else {
        this.logout()
      }
      return false
    })
  }
  
  async createAlertMessage() {
    const toast = await this.toastController.create({
      header: 'Atenção',
      message: `Há novo(s) componente(s) com atributo(s) fora do recomendável`,
      position: 'top',
      cssClass: 'dangerToast',
      buttons: [
        {
          text: 'Verificar',
          cssClass: 'checkButton',
          handler: () => {
            this.router.navigateByUrl(`/dashboard/Mapa`)
          }
        }
      ]

    });
    toast.present();
  }

  stopGetAlertedComponents(interval) {
    clearInterval(interval)
  }

  async fillSideMenu() {
    this.appPages = []
    let menuItems = await this.deviceService.getComponents()
    if( menuItems instanceof Array) {
      for(let i = 0; i < menuItems.length; i++) {
        if(menuItems[i].subComponents.length > 0) { // have subcomponents
          let menuItem = {title: menuItems[i].name, seq: menuItems[i].order, alerted: false, children: []}
          
          for(let j=0; j < menuItems[i].subComponents.length; j++) {
            let subItem = menuItems[i].subComponents[j];
            menuItem.children.push({id: subItem.id, title: subItem.name, seq: subItem.order, alerted: subItem.alerted, url: `/device-details/${subItem.id}`} )
            if(subItem.alerted == true) {
              menuItem.alerted = true;
              this.alertedComponents.push(subItem.id);
            }

          }
          menuItem.children.sort( ( a, b ) => { 
            if ( a.seq < b.seq )
              return -1
            if ( a.seq > b.seq )
              return 1
            return 0
          })
          this.appPages.push(menuItem);
         

        } else {
          let menuItem = {id: menuItems[i].id, title: menuItems[i].name, seq: menuItems[i].order, alerted: menuItems[i].alerted, url: `/device-details/${menuItems[i].id}`}
          this.appPages.push(menuItem);

          if(menuItem.alerted == true) this.alertedComponents.push(menuItem.id);
         
        }
      }
    }

    this.appPages = this.appPages.sort(MenuItem.compare); 
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
            console.log('Confirm Cancel');
            alert.dismiss()
          }
        }, {
          text: 'Ok',
          handler: (data) => {

            Constants.BASE_API_URL = `http://${data.ip}:${data.port}`
            console.log(Constants.BASE_API_URL)
            alert.dismiss()
          }
        }
      ]
    });
    
    await alert.present();

  }

}

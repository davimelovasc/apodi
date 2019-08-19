import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, MenuController, ToastController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Constants } from './models/constants';
import { FakeRequests } from './models/fakeRequests';
import { MenuSubItem } from './models/menuSubItem';
import { MenuItem } from './models/menuItem';
import { AuthenticationService } from './services/authentication.service';
import { DeviceService } from './services/device.service';

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
    private storage: Storage,
    private authenticationService: AuthenticationService,
    public deviceService: DeviceService,
    public toastController: ToastController,
    public events: Events
  ) {
    this.initializeApp();
    this.authenticationService.authenticationState.subscribe(state => {
      if (state) {
        this.interval = setInterval(() => {this.getAndSaveAlertedComponents()}, Constants.WATCHING_TIME)
      }
    })


    // setTimeout(() => {
    //   this.createAlertMessage("CY01", "Ciclone 01") //just for test
    // }, 3000)

    
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
          this.fillSideMenu()
          this.menuCtrl.enable(true)
          this.router.navigate(['dashboard/Mapa'])

        } else {
          this.menuCtrl.enable(false)
          this.router.navigate(['login']);
        }
      });

      // let menuItems = FakeRequests.loginRequest() // REQUEST_TODO
      // menuItems = menuItems = menuItems.components;

      //this.fillSideMenu()

    });



    // this.platform.pause.subscribe(() => {        
      
    // });  
    // this.platform.resume.subscribe(() => { 
    //   this.storage.get('token').then( token => {
        
    //   })
      
    //   this.authenticationService.refreshToken();  
    //   console.log('****UserdashboardPage RESUMED****');
    // });

    
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
    //invalid token request
    this.stopGetAlertedComponents(this.interval)
    this.authenticationService.logout()
  }

  getAndSaveAlertedComponents(retry: boolean = true) {
    //todo refresh access token
    this.deviceService.getAlertedComponents().then(res => {
      if (res instanceof Array) {
        
        const resIds = res.map(comp => { return comp.id })

        this.alertedComponents = this.alertedComponents.filter( id => { return (resIds.indexOf(id) == -1 ? false : true) }) //remove os elementos que nao estão mais em alertas
        resIds.map( id => {
          if(this.alertedComponents.indexOf(id) == -1) {
            this.alertedComponents.push(id) //novo elemento
            this.createAlertMessage(id)

          }
        })
        this.events.publish('alerted-components:update', this.alertedComponents)
        //this.storage.set('alerted-components', this.alertedComponents)

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

  getIdAlertedComponentes() {
    

  }


  
  async createAlertMessage(component_id) {
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
            //this.storage.set(subItem.id, subItem);
          }
          menuItem.children.sort( ( a, b ) => { 
            if ( a.seq < b.seq )
              return -1
            if ( a.seq > b.seq )
              return 1
            return 0
          })
          this.appPages.push(menuItem);
          //this.storage.set(menuItem.title, menuItem);

        } else {
          let menuItem = {id: menuItems[i].id, title: menuItems[i].name, seq: menuItems[i].order, alerted: menuItems[i].alerted, url: `/device-details/${menuItems[i].id}`}
          this.appPages.push(menuItem);

          if(menuItem.alerted == true) this.alertedComponents.push(menuItem.id);
          //this.storage.set(menuItem.id, menuItem);
        }
      }
    }

      this.storage.set('alerted-components', this.alertedComponents)
      this.appPages = this.appPages.sort(MenuItem.compare); 
  }

}

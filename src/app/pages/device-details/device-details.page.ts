import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component as ComponentModel } from '../../models/component';
import { Parameter } from 'src/app/models/parameter';
import { Constants } from 'src/app/models/constants';
import { LoadingController } from '@ionic/angular';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { Utils } from 'src/app/models/utils';
import { FakeRequests } from 'src/app/models/fakeRequests';
import { Storage } from '@ionic/storage';
import { DeviceService } from 'src/app/services/device.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.page.html',
  styleUrls: ['./device-details.page.scss'],
})
export class DeviceDetailsPage implements OnInit {
  id: number;
  title: String;
  subTitle: String;
  component: ComponentModel = new ComponentModel();
  paramNameClass: string = "paramName";
  qrResponse: string;
  scanSub;
  public updateintervals;
  

  constructor(private menuCtrl: MenuController, private router: Router, private route: ActivatedRoute,
              private qrScanner: QRScanner,public toastController: ToastController, private storage: Storage,
              private deviceService: DeviceService, private authenticationService: AuthenticationService,
              public loadingController: LoadingController) {

  
    this.route.params.subscribe( async params => {
      this.component.parameters = [] //clear Params On Screen
      
      this.id = params['id'];
      //let title = params['title'];

      // if(title) {
      //   this.title = title;
      // }
      if(this.id) { 
        //this.subTitle = id;
        //let response;
        //await this.presentLoading()
        await this.getParametersAndUpdateScreen(this.id);
        
        //this.loadingController.dismiss();



      }

    });

   }

  ngOnInit() {
    this.menuCtrl.enable(true);
    
    this.updateintervals = setInterval(() => {this.getParametersAndUpdateScreen(this.id)}, Constants.REFRESH_COMPONENT_PARAMS_TIME)

  }

  ionViewWillLeave() {
    clearInterval(this.updateintervals)
  }

  async getParametersAndUpdateScreen(id) {
    await this.presentLoading()
    let response;
    this.getComponentById(id).then( res => {
      response = res
      //this.cacheResponse(response)
      this.configureComponent(response) // Atualiza as variaveis na tela
    }, err => {
      if(err.status == 401) {
        this.authenticationService.refreshToken().then( data => { // refresh token

          this.getComponentById(id).then(res => {
            response = res
            //this.cacheResponse(response)
            this.configureComponent(response) // Atualiza as variaveis na tela
            
          }, err => {
            this.router.navigateByUrl('/login')
          })
        })
      }
      
    })  
    this.loadingController.dismiss();
  }

  async cacheResponse(response) {
    return await this.storage.set(`${response.code}_cache`, response).then(() => { //${response.code}_cache
      setTimeout(() => {
        this.storage.remove(`${response.code}_cache`)
      }, Constants.OBSOLATE_TIME);
    });
  }

  decideIcon(unit){
    return Utils.decideIcon(unit);
  }

  // getUnitSimbol(unit){
  //   return Utils.getUnitSimbol(unit);
  // }

  // simulateResponseById() {
  //   return FakeRequests.getComponentById();
  // }

  getComponentById(id) {
    return this.deviceService.getById(id)
  }

  configureComponent(response) {
    this.component.id = response.id;
    this.component.name = response.name;
    this.component.code = response.code;
    this.component.parameters = [];
    for (let parameter of response.parameters) {
      this.component.parameters.push(new Parameter({id: parameter.id, code: parameter.code, name: parameter.name, 
        unit: parameter.unit, displayFormat: parameter.displayFormat, values: parameter.values, threshold_hh: parameter.threshold_hh,
        threshold_h: parameter.threshold_h, threshold_ll: parameter.threshold_ll, threshold_l: parameter.threshold_l,
        alerted: parameter.alerted, lastUpdate: new Date(parameter.date), component_id: parameter.componentId}));

    }


  }

  checkSize(name: string) {
    if(name.length > 24)
      return false
    
    return true
  }

  scan() {
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.scanSub = this.qrScanner.scan().subscribe((text: string) => {

          this.deviceService.getByQRCode(text).then(res => { 
            this.router.navigateByUrl(`/device-details/${res['id']}`)
          }, err => {
            if(err.status == 400) {
              this.authenticationService.refreshToken().then(res => {
                this.deviceService.getByQRCode(text).then(res => { 
                  this.router.navigateByUrl(`/device-details/${res['id']}`)
                }, err => {
                  //logout
                })
              })
            } else if(err.status == 404) {
              this.presentToast("QR code inválido")
            }
          })
          
          this.closeScan();

        });

        this.qrScanner.show();
        // hide app background
        const rootElement = <HTMLElement>document.getElementsByTagName('html')[0];
        rootElement.classList.add('qr-scanner-open');

      } else if (status.denied) {
        this.qrScanner.openSettings();
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is', e));

    }

  closeScan() {
    this.qrScanner.hide();
    this.scanSub.unsubscribe();

    const rootElement = <HTMLElement>document.getElementsByTagName('html')[0];
    rootElement.classList.remove('qr-scanner-open');
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }

  defParamClass(param: Parameter) {
    status = ""
    if(param) {
      var status = param.status();
    }
    return "paramValue " + status;
  }

  toFixed(num, fixed = 2) {
    //if(!num) return ""
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
  } 

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 5000
    });

    return await loading.present();

    
  }


}

import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component as ComponentModel } from '../../models/component';
import { Parameter } from 'src/app/models/parameter';
import { Constants } from 'src/app/models/constants';


import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { Utils } from 'src/app/models/utils';
import { FakeRequests } from 'src/app/models/fakeRequests';
import { Storage } from '@ionic/storage';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.page.html',
  styleUrls: ['./device-details.page.scss'],
})
export class DeviceDetailsPage implements OnInit {

  title: String;
  subTitle: String;
  component: ComponentModel = new ComponentModel();
  paramNameClass: string = "paramName";
  qrResponse: string;
  scanSub;
  

  constructor(private menuCtrl: MenuController, private router: Router, private route: ActivatedRoute,
              private qrScanner: QRScanner,public toastController: ToastController, private storage: Storage,
              private deviceService: DeviceService) {

  
    this.route.params.subscribe(params => {
      
      let id = params['id'];
      let title = params['title'];

      if(title) {
        this.title = title;
      }
      if(id) { // checa se tem no banco local
        this.subTitle = id;
        let response;
        this.storage.get(`${id}_cache`).then(val => {
          if(val) {
            response = val;
            console.log("valor está presente no banco");
          } else {
            response = this.simulateResponseById(); //TODO_REQUEST ... no fim, guarda no banco
            storage.set(`${response.code}_cache`, response).then(() => {
              setTimeout(() => {
                this.storage.remove(`${response.code}_cache`).then(() => console.log("Dado obsoleto removido com sucesso"));
              }, Constants.OBSOLATE_TIME);
            });
            console.log("valor nao estava no banco, foi cacheado");
            
          }
          this.configureComponent(response); // Atualiza as variaveis na tela
        });

        
        
      }
      

      
     
      
      
    });

   }

  ngOnInit() {
    this.menuCtrl.enable(true);

  }

  decideIcon(unit){
    return Utils.decideIcon(unit);
  }

  // getUnitSimbol(unit){
  //   return Utils.getUnitSimbol(unit);
  // }

  simulateResponseById() {
    return FakeRequests.getComponentById();
  }

  configureComponent(response) {
    this.component.id = response.id;
    this.component.name = response.name;

    for (let parameter of response.parameters) {
      this.component.parameters.push(new Parameter({id: parameter.id, code: parameter.code, name: parameter.name, 
        unit: parameter.unit, displayFormat: parameter.displayFormat, values: parameter.values, threshold_hh: parameter.threshold_hh,
        threshold_h: parameter.threshold_h, threshold_ll: parameter.threshold_ll, threshold_l: parameter.threshold_l,
        alerted: parameter.alerted, lastUpdate: new Date(parameter.date), component_id: parameter.componentId}));
      
    }


  }

  checkSize(name: string) {
    if(name.length > 32) {
      return false; 
    }

    return true;
  }

  scan() {
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
          this.storage.get('token').then( token => {
            this.deviceService.getByQRCode("11.111",token).then(res => {  // change 11.111 for text
              if(res){
                this.router.navigateByUrl(`/device-details/${res['id']}/${res['name']}`)
              }
            })
            this.closeScan();
          })
          
        
          
          
          

          // this.qrScanner.hide(); // hide camera preview
          // this.scanSub.unsubscribe(); // stop scanning
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
    let status = param.status();
    return "paramValue " + status;
  }


}

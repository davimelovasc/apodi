import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { DeviceService } from 'src/app/services/device.service';
import { Storage } from '@ionic/storage';
import { AppComponent } from 'src/app/app.component';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public alertedComponents = []
  public components =[]
  public alertedCompWithName = []

  // [{
    //    id: 1,
    //    name: "com 1"
  // },
  // {
    //     id: 2,
    //    name: "com 2"
  // }]


  constructor(private menuCtrl: MenuController, private deviceService: DeviceService, private storage: Storage, private appComponent: AppComponent,
     public events: Events, public loadingController: LoadingController) {
    this.components = this.appComponent.appPages
    this.alertedComponents = this.appComponent.alertedComponents
    this.setComponentsName()
   
    
    // this.getAlertedComponents().then(res => {
    //   this.setComponentsName()
    // })
    
    //
    //this.alertedComponents = this.appComponent.alertedComponents
    

    
  }
   

  ngOnInit() {
    this.menuCtrl.enable(true); 
    this.menuCtrl.close();

    this.events.subscribe('alerted-components:update', async alertedComps => {

      if(JSON.stringify(this.alertedComponents) !== JSON.stringify(alertedComps)){
        await this.presentLoading()
        this.alertedComponents = alertedComps
        this.setComponentsName()
        this.loadingController.dismiss()
      }
      
      
    })
    
  }

  // async getAlertedComponents() {
  //   this.alertedComponents = await this.storage.get('alerted-components')

  // }

  setComponentsName() {
    this.alertedCompWithName = []
    this.components.forEach(comp => {
      if(comp.children) {
        comp.children.forEach(child => {
          if(this.alertedComponents.indexOf(child.id) != -1)
            this.alertedCompWithName.push({id: child.id, name: child.title})
        })
      } else {
        if(this.alertedComponents.indexOf(comp.id) != -1)
          this.alertedCompWithName.push({id: comp.id, name: comp.title})
      }
    })
   
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 5000
    });

    return await loading.present();

    
  }


}

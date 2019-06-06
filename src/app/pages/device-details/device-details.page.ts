import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component as ComponentModel } from '../../models/component';
import { Parameter } from 'src/app/models/parameter';
import { Constants } from 'src/app/models/constants';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.page.html',
  styleUrls: ['./device-details.page.scss'],
})
export class DeviceDetailsPage implements OnInit {

  title: String;
  attributes: number[];
  component: ComponentModel = new ComponentModel();
  paramNameClass: string = "paramName";

  constructor(private menuCtrl: MenuController, private router: Router, private route: ActivatedRoute) {
    
    this.route.params.subscribe(params => {
      
      let id = params['id'];
      let title = params['title'];

      if(title) {
        this.title = title;
      }
      if(id) {
        //make request and update variables
        
      }

      const response = this.simulateResponseById();
      this.configureComponent(response);
      console.log(this.component);
      
      
    });

   }

  ngOnInit() {
    this.menuCtrl.enable(true);

  }

  decideIcon(unit){
    
    switch(unit.toUpperCase()) {
      case Constants.PRESSAO.toUpperCase():
        return "../../../assets/icon/pressure.svg";
      case Constants.TEMPERATURA.toUpperCase():
        return "../../../assets/icon/thermometer.svg";
    }
  }

  getUnitSimbol(unit){

    switch(unit.toUpperCase()) {
      case Constants.PRESSAO.toUpperCase():
        return "°C";
      case Constants.TEMPERATURA.toUpperCase():
        return "mbar";
    }
    
  }

  simulateResponseById() {
    let response = `{
      "id": 0,
      "name": "Teste de nome",
      "code": "some text",
      "parameters": [
      {
      "id": 29,
      "code": "some text",
      "name": "Temperatura do topo",
      "unit": "temperatura",
      "displayFormat": { },
      "values": [350, 150],
      "threshold_hh": 34.76,
      "threshold_h": 61.07,
      "threshold_ll": 30.63,
      "threshold_l": 44.85,
      "alerted": true,
      "lastUpdate": "2018-02-10T09:30Z",
      "componentId": 74
      },
      {
      "id": 72,
      "code": "some text",
      "name": "Pressão do topo",
      "unit": "pressao",
      "displayFormat": { },
      "values": [2, 5],
      "threshold_hh": 37.92,
      "threshold_h": 72.81,
      "threshold_ll": 46.68,
      "threshold_l": 20.17,
      "alerted": true,
      "lastUpdate": "2018-02-10T09:30Z",
      "componentId": 88
      },
      {
      "id": 72,
      "code": "some text",
      "name": "Vazão de resíduo pastoso (coprocessamento)",
      "unit": "pressao",
      "displayFormat": { },
      "values": [2, 5],
      "threshold_hh": 37.92,
      "threshold_h": 72.81,
      "threshold_ll": 46.68,
      "threshold_l": 20.17,
      "alerted": true,
      "lastUpdate": "2018-02-10T09:30Z",
      "componentId": 88
      }
      
      ]
      }`;
      response = JSON.parse(response);
    return response;
  }

  configureComponent(response) {
    this.component.id = response.id;
    this.component.name = response.name;

    for (let parameter of response.parameters) {
      this.component.parameters.push(new Parameter(parameter.id, parameter.name,
        parameter.unit, parameter.values, parameter.threshold_hh, parameter.threshold_h,
        parameter.threshold_ll, parameter.threshold_l, parameter.alerted));
    }
  }

  checkSize(name: string) {
    if(name.length > 32) {
      return false; 
    }

    return true;
  }

}

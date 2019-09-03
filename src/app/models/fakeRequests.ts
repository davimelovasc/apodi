import { MenuSubItem } from './menuSubItem';
import { MenuItem } from './menuItem';

export class FakeRequests {
    
    constructor(){}


    static loginRequest():any {
        let response = `{
            "components": [
                {
                    "code": "BR_RO",
                    "id": 1,
                    "name": "Britador de rolos",
                    "alerted": false,
                    "seq": 3
                },
                {
                    "code": "CAL01",
                    "id": 2,
                    "name": "Calcinador",
                    "alerted": true,
                    "seq": 4
                },
                {
                    "code": "TAD01",
                    "id": 1,
                    "name": "Duto de ar terceário",
                    "alerted": false,
                    "seq": 2
                },
                {
                    "name": "Ciclones",
                    "seq": 1,
                    "subcomponents": [
                        {
                            "seq": 1,
                            "name": "Ciclone 01",
                            "alerted": false,
                            "code": "CY01",
                            "id": 1
                        },
                        {
                            "seq": 2,
                            "name": "Ciclone 02",
                            "alerted": true,
                            "code": "CY02",
                            "id": 2
                        }
                    ]
                }
            ]
        }`
    response = JSON.parse(response);
    return response;

    }

    static getComponentById(id = 0){
        let response = `{
            "id": 0,
            "name": "Cyclone 01",
            "code": "CY01",
            "parameters": [
            {
            "id": 1,
            "code": "PD1CY01N03T01",
            "name": "Temperatura do topo",
            "unit": "°C",
            "displayFormat": "point",
            "values": [923.36],
            "threshold_hh": 920.94,
            "threshold_h": 910.31,
            "threshold_ll": 665.15,
            "threshold_l": 580.54,
            "alerted": true,
            "lastUpdate": "2018-02-10T09:30Z",
            "componentId": 74
            },
            {
                "id": 2,
                "code": "PD1CY01N01P01",
                "name": "Pressão do topo",
                "unit": "mbar",
                "displayFormat": "point",
                "values": [
                    5
                ],
                "threshold_hh": 7,
                "threshold_h": 6,
                "threshold_ll": 1,
                "threshold_l": 2,
                "alerted": false,
                "lastUpdate": "2018-02-10T09:30Z",
                "componentId": 1
            },
            {
                "id": 72,
                "code": "PD1GAA01A01A01",
                "name": "Monóxido de carbono",
                "unit": "ppm",
                "displayFormat": "point",
                "values": [
                    2
                ],
                "threshold_hh": 7,
                "threshold_h": 6,
                "threshold_ll": 1,
                "threshold_l": 4,
                "alerted": true,
                "lastUpdate": "2018-02-10T09:30Z",
                "componentId": 1
            },
            {
                "id": 75,
                "code": "PD1GAA01A01A01",
                "name": "Monóxido de carbono",
                "unit": "%",
                "displayFormat": "point",
                "values": [
                    2
                ],
                "threshold_hh": 7,
                "threshold_h": 6,
                "threshold_ll": 1,
                "threshold_l": 4,
                "alerted": true,
                "lastUpdate": "2018-02-10T09:30Z",
                "componentId": 1
            },
            {
                "id": 71,
                "code": "PD1GAA01A01A01",
                "name": "Monóxido de carbono",
                "unit": "A",
                "displayFormat": "point",
                "values": [
                    2
                ],
                "threshold_hh": 7,
                "threshold_h": 6,
                "threshold_ll": 1,
                "threshold_l": 4,
                "alerted": true,
                "lastUpdate": "2018-02-10T09:30Z",
                "componentId": 1
            }
            ]
            }`;
            response = JSON.parse(response);
            return response;
    }


    static getAlertedComponents(){
        let response = `
            [
            {
                "id": 1,
                "code": "PD1CY01N03T01",
                "name": "Temperatura do topo",
                "unit": "°C",
                "displayFormat": "point",
                "values": [923.36],
                "threshold_hh": 920.94,
                "threshold_h": 910.31,
                "threshold_ll": 665.15,
                "threshold_l": 580.54,
                "alerted": true,
                "lastUpdate": "2018-02-10T09:30Z",
                "componentId": 2
            },
            {
                "id": 2,
                "code": "PD1CY01N01P01",
                "name": "Pressão do topo",
                "unit": "mbar",
                "displayFormat": "point",
                "values": [
                    5
                ],
                "threshold_hh": 7,
                "threshold_h": 6,
                "threshold_ll": 1,
                "threshold_l": 2,
                "alerted": false,
                "lastUpdate": "2018-02-10T09:30Z",
                "componentId": 1
            },
            {
                "id": 72,
                "code": "PD1GAA01A01A01",
                "name": "Monóxido de carbono",
                "unit": "ppm",
                "displayFormat": "point",
                "values": [
                    2
                ],
                "threshold_hh": 7,
                "threshold_h": 6,
                "threshold_ll": 1,
                "threshold_l": 4,
                "alerted": true,
                "lastUpdate": "2018-02-10T09:30Z",
                "componentId": 1
            },
            {
                "id": 75,
                "code": "PD1GAA01A01A01",
                "name": "Monóxido de carbono",
                "unit": "%",
                "displayFormat": "point",
                "values": [
                    2
                ],
                "threshold_hh": 7,
                "threshold_h": 6,
                "threshold_ll": 1,
                "threshold_l": 4,
                "alerted": true,
                "lastUpdate": "2018-02-10T09:30Z",
                "componentId": 5
            },
            {
                "id": 71,
                "code": "PD1GAA01A01A01",
                "name": "Monóxido de carbono",
                "unit": "A",
                "displayFormat": "point",
                "values": [
                    2
                ],
                "threshold_hh": 7,
                "threshold_h": 6,
                "threshold_ll": 1,
                "threshold_l": 4,
                "alerted": true,
                "lastUpdate": "2018-02-10T09:30Z",
                "componentId": 12
            }
            ]
            `;
            response = JSON.parse(response);
            return response;
    }


}
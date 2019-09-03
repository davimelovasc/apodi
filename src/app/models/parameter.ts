import { Constants } from './constants';

export class Parameter {

    id: number;
    code: string;
    name: string;
    unit: string;
    displayFormat: string;
    values: Array<number>; //= new Array<number>();
    threshold_hh: number;
    threshold_h: number;
    threshold_ll: number;
    threshold_l: number;
    alerted: string;
    lastUpdate: Date;
    component_id: number;

    public constructor(
        fields?: {
            id?: number,
            code?: string,
            name?: string,
            unit?: string,
            displayFormat?: string,
            values?: Array<number>,
            threshold_hh?: number,
            threshold_h?: number,
            threshold_ll?: number,
            threshold_l?: number,
            alerted?: string,
            lastUpdate?: Date,
            component_id?: number
        }) {
        if (fields) Object.assign(this, fields);
    }

    // constructor(
    //     id?: number,
    //     code?: string,
    //     name?: string,
    //     unit?: string,
    //     displayFormat?: string,
    //     values?: Array<number>,
    //     threshold_hh?: number,
    //     threshold_h?: number,
    //     threshold_ll?: number,
    //     threshold_l?: number,
    //     alerted?: boolean,
    //     lastUpdate?: Date,
    //     component_id?: number
    // ){
    //     this.values = new Array<number>();
    //     
        
    //     values.forEach(val => {
    //         this.values.push(val);
    //     });
    //     this.lastUpdate = new Date(lastUpdate);
        
    // }

    status() {
        // TODO check if param is graphical or simple value
        switch(this.alerted) {
            case Constants.ALERTED_NONE: 
                return "normal";  
            case Constants.ALERTED_HH: 
                return "higher-high"
            case Constants.ALERTED_H:
                return "high"
            case Constants.ALERTED_L:
                return "low"
            case Constants.ALERTED_LL:
                return "lower-low"
            default:
                return "unknow"
        }
    }


}
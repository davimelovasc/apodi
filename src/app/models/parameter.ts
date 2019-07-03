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
    alerted: boolean;
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
            alerted?: boolean,
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
        // check if param is graphical or simple value
        let value = this.values[0];
        if(!this.alerted) return "not alerted";
        if(value >= this.threshold_hh) { // HH
            return "higher-high";
        } else if(value < this.threshold_hh && value >= this.threshold_h) { // H
            return "high";
        } else if(value < this.threshold_h && value > this.threshold_l ) { // NORMAL
            return "normal";
        } else if(value <= this.threshold_l && value > this.threshold_ll) { // L
            return "low";
        } else if(value <= this.threshold_ll) { //LL
            return "lower-low";
        }
        return "unknow";
    }


}
export class Parameter {

    constructor(
        public id?: number,
        public name?: string,
        public unit?: string,
        public values?: Array<number>,
        public threshold_hh?: number,
        public threshold_h?: number,
        public threshold_ll?: number,
        public threshold_l?: number,
        public alerted?: boolean
    ){
        this.values = new Array<number>();
        values.forEach(val => {
            this.values.push(val);
        })
        
    }


}
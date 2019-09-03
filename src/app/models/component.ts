import { Parameter } from './parameter';

export class Component {
    
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public parameters?: Array<Parameter>)
        {
            this.parameters = new Array<Parameter>();
        }


    isAlerted(): boolean {
        this.parameters.forEach(param => {
            if(param.status() !== "normal") return true;
        });

        return false;
    }


}
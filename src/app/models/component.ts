import { Parameter } from './parameter';

export class Component {
    
    constructor(
        public id?: number,
        public name?: string,
        public parameters?: Array<Parameter>)
        {
            this.parameters = new Array<Parameter>();
        }




}
import { MenuSubItem } from './menuSubItem';

export class MenuItem {

    id?: number;
    name: string;
    seq: number;
    subItems?: Array<MenuSubItem>;
    url?: string;


    constructor(name, seq, id?, subItens?){
        this.name = name;
        this.seq = seq;
        this.id = id;
        this.subItems = subItens;

        if(id) {
            this.url = `/device-detais/${this.id}`
        }
    }

    static compare( a, b ) {
        if ( a.seq < b.seq ){
          return -1;
        }
        if ( a.seq > b.seq ){
          return 1;
        }
        return 0;
      }
}
import { Constants } from "./constants";

export class Utils {
  
    public static decideIcon(unit: string){
        switch(unit.toUpperCase()) { 
          case Constants.TEMPERATURA_UNIT.toUpperCase():
            return Constants.TEMPERATURA_ICON;
            
          case Constants.PRESSAO_UNIT.toUpperCase():
            return Constants.PRESSAO_ICON;

          case Constants.NIVEL_GAS_UNIT.toUpperCase():
            return Constants.NIVEL_GAS_ICON;

          case Constants.PERCENTUAL_UNIT.toUpperCase():
            return Constants.PERCENTUAL_ICON;

          case Constants.CORRENTE_UNIT.toUpperCase():
            return Constants.CORRENTE_ICON;
        }
    }

    // public static getUnitSimbol(unit){
    //   switch(unit.toUpperCase()) {
    //     case Constants.TEMPERATURA.toUpperCase():
    //       return Constants.TEMPERATURA_UNIT;
    //     case Constants.PRESSAO.toUpperCase():
    //       return Constants.PRESSAO_UNIT;
    //     case Constants.NIVEL_GAS.toUpperCase():
    //       return Constants.NIVEL_GAS_UNIT;
    //   }
    // }


}
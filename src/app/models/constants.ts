export class Constants {
    public static TEMPERATURA_UNIT = "°C"
    public static PRESSAO_UNIT = "mbar"
    public static NIVEL_GAS_UNIT = "ppm"
    public static PERCENTUAL_UNIT = "%"
    public static CORRENTE_UNIT = "A"

    

    public static TEMPERATURA_ICON = "../../../assets/icon/temperatura.svg"
    public static PRESSAO_ICON = "../../../assets/icon/pressao.svg"
    public static NIVEL_GAS_ICON = "../../../assets/icon/ppm.svg"
    public static PERCENTUAL_ICON = "../../../assets/icon/percent.svg"
    public static CORRENTE_ICON = "../../../assets/icon/corrente.svg"

    // tempo para tornar o dado em cache obsoleto
    public static OBSOLATE_TIME = 1000 * 10 //not using (seconds)
    // intervalo de tempo para mandar cada requisição para monitorar componentes em alerta
    public static WATCHING_TIME = 1000 * 10 // 10 seconds
    // intervalo de tempo para buscando os novos valores no servidor na tela de visualização de parâmetros
    public static REFRESH_COMPONENT_PARAMS_TIME = 1000 * 20 // 20 seconds



    public static BASE_API_URL = "http://172.20.5.2:80"

    public static TOKEN_CODE = "token"


    public static ALERTED_NONE = "ALERT_NONE"
    public static ALERTED_HH = "ALERT_HH"
    public static ALERTED_H = "ALERT_H"
    public static ALERTED_L = "ALERT_L"
    public static ALERTED_LL = "ALERT_LL"

}
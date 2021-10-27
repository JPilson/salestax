import moment from "moment";
import store from "../store/index"
import {AppTheme} from "@/values/Colors";
import NumberFormatOptions = Intl.NumberFormatOptions;
import {Theme} from "vuetify/types/services/theme";

moment.locale('pt-br');

export enum dateFormats {
    MMDDYYYY,
    DDMMYYYYhhmmss,
    MMMYYYYDD,
    MMM
}

export enum month {
    jan,
    feb,
    mar,
    apr,
    may,
    jun,
    jul,
    oug,
    sep,
    oct,
    nov,
    dez
}

export default class Utils {
    constructor() {
    //    Class Constructor

    }
 public static dateFormats = [
     "MM-DD-YYYY",
     "DD-MM-YYYY",
     "MMM YYYY,DD",
     "MMMM"
 ];




    public static formatDate(date:Date|string|number,format:dateFormats):string{
        const dateX = new Date(date)
        return moment(dateX).format(Utils.dateFormats[format]);
    }

    static getRandomInt(max:number):number {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static currency(valor:string|number,currency: string | null='AOA',showCurrency=true):string {
        const locale = "de-DE" //de-DE
        const  value: number = (typeof valor === "string")?parseFloat(valor):valor
        const options:NumberFormatOptions = showCurrency?{
            style: 'currency',
            currency: currency?.toString(),
        } : {}

        return new Intl.NumberFormat(locale, options).format(value)

    }

     static tel(number:string):void{
        try {
            let phone;
            if (number.includes("+244"))
                phone = number;
            else
                phone = "+244" + number.trim();

            window.open(`tel:${phone}`);
        } catch (e) {
            const erro =  new Error();
            erro.name = "Nao foi Possível ligar"
            erro.stack = e.stack;
            throw erro;
        }
    }


    static  onThemeChange = (ThemeMediaQuery:MediaQueryListEvent|MediaQueryList,vuetifyTheme: Theme):void=>{
       // const systemTheme =  window.matchMedia("(prefers-color-scheme: dark)");
        vuetifyTheme.dark = ThemeMediaQuery.matches
        if(ThemeMediaQuery.matches)
            store.dispatch("changeAppTheme", AppTheme.dark).then()
        else
            store.dispatch("changeAppTheme",AppTheme.light).then()

    }




}
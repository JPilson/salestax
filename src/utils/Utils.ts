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
     "MM DD,YYYY",
     "MMMM"
 ];




    public static formatDate(date?:Date|string|number,format:dateFormats = dateFormats.MMMYYYYDD):string{
        const dateX = date?new Date(date) : new Date()
        return moment(dateX).format(Utils.dateFormats[format]);
    }

    static getRandomInt(max:number):number {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static currency(valor:string|number,currency ='EUR',showCurrency=true):string {
        const locale = "de-DE" //de-DE
        const  value: number = (typeof valor === "string")?parseFloat(valor):valor
        const options:NumberFormatOptions = showCurrency?{
            style: 'currency',
            currency: currency?.toString(),
        } : {}

        return new Intl.NumberFormat(locale, options).format(value)

    }
     generateFakeId(prefix =  " "):string {
        const date = new Date();
        return (prefix +  date.getUTCHours().toString() + date.getDate().toString().toString() + date.getUTCFullYear().toString()).trim()

    }





    static  onThemeChange = (ThemeMediaQuery:MediaQueryListEvent|MediaQueryList,vuetifyTheme: Theme):void=>{
       // const systemTheme =  window.matchMedia("(prefers-color-scheme: dark)");
       //  vuetifyTheme.dark = ThemeMediaQuery.matches
       //  if(ThemeMediaQuery.matches)
       //      store.dispatch("changeAppTheme", AppTheme.dark).then()
       //  else
       //      store.dispatch("changeAppTheme",AppTheme.light).then()

    }




}
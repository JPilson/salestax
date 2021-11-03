import TaxHelper from "@/utils/TaxHelper";
import Utils, {dateFormats} from "@/utils/Utils";

interface ProductInterface {
    id?:string
    name:string;
    description?:string
    isImported:boolean
    price:number
    category:ProductCategory
    img?:any,
    setPriceAfterTax?:()=>void,
    totalOfTax?:number,
    total?:number
}
export enum ProductCategory {
    book="book",
    food="food",
    medical="medical",
    toy="toy",
    electronic= "electronic",
    discography = "discography",
    other = "other"


}
export default class ProductModel implements ProductInterface{

    private readonly taxHelper = new TaxHelper()
    id!:string
    name!:string;
    description!:string
    isImported!:boolean
    isTaxable!:boolean
    price!:number
    category!:ProductCategory
    img!:string
    priceAfterTax!:number
    totalOfTax = 0;
    total = 1




    constructor(props?:ProductInterface) {


        if(props){
            this.name = props.name;
            this.description = props.description??""
            this.isImported =  props.isImported
            this.isTaxable = this.taxHelper.isProductTaxable(props.category)
            this.price = props.price
            this.category = props.category
            this.img = props.img??""
        }
        setTimeout(async ()=> {
            this.id = this.generateFakeId()
        },1000)
    }
    setPriceAfterTax():number {
        this.priceAfterTax =  this.taxHelper.valueAfterTax(this.price,this.isImported,this.isTaxable)
        this.totalOfTax = parseFloat((this.priceAfterTax - this.price).toFixed(2))


        return this.priceAfterTax
    }
    generateFakeId(prefix =  " "):string {
        const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        return  randLetter + Date.now();
    }








}
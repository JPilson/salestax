import TaxHelper from "@/utils/TaxHelper";
import Utils from "@/utils/Utils";
 interface ProductInterface {
    id?:string
    name:string;
    description?:string
    isImported:boolean
    price:number
    category:ProductCategory
    img?:string,
    setPriceAfterTax?:()=>void,
     totalOfTax?:number,
}
export enum ProductCategory {
    book,
    food,
    medical,
    toy,
    electronic,
    discography


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




    constructor(props?:ProductInterface) {
        this.id  = "Utils.generateFakeId()"
        if(props){
            this.name = props.name;
            this.description = props.description??""
            this.isImported =  props.isImported
            this.isTaxable = this.taxHelper.isProductTaxable(props.category)
            this.price = props.price
            this.category = props.category
            this.img = props.img??""
        }
    }
    setPriceAfterTax():number {
        this.priceAfterTax =  this.taxHelper.valueAfterTax(this.price,this.isImported,this.isTaxable)
        this.totalOfTax = parseFloat((this.priceAfterTax - this.price).toFixed(3))
        // this.totalOfTax = Math.ceil(this.priceAfterTax - this.price)

        return this.priceAfterTax
    }







}
import TaxHelper from "@/utils/TaxHelper";
import {Store} from "vuex";
import {priceUpdateType} from "@/models/Order.model";


interface ProductInterface {
    id?:string
    name:string;
    description?:string
    isImported:boolean
    price:number
    category:ProductCategory
    img?:any,
    totalOfTax?:number,
    quantity?:number,
    updateParent?:boolean

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
    private storeReference!:Store<any>
    id!:string
    name!:string;
    description!:string
    isImported!:boolean
    isTaxable!:boolean
    price!:number
    category!:ProductCategory
    img!:string
    priceAfterTax = 0
    totalOfTax = 0;
    quantity = 1
    updateParent = false




    constructor(props?:ProductInterface) {


        if(props){
            this.name = props.name;
            this.description = props.description??""
            this.isImported =  props.isImported
            this.isTaxable = this.taxHelper.isProductTaxable(props.category)
            this.price = props.price
            this.category = props.category
            this.img = props.img??""
            this.updateParent = props.updateParent??false

            this.setPriceAfterTax(true,"increment")

        }
        setTimeout(async ()=> {
            this.id = this.generateFakeId()
        },1000)
    }
    set setState(state:Store<any>){
        this.storeReference = state
    }

    /**
     * Calculate the product price with Tax Included
     * @param isNew refers to the object being newly constructed or new in a collection (e.g: in order for the cart)
     * In case the isNew = true then the value passed in the method onPriceUpdated() is priceAfterTax otherwise the basePriceAfterTax
     * will the parameter for onPriceUpdated
     * @param updateType
     */
    setPriceAfterTax(isNew= false,updateType:priceUpdateType):void {

        try {
            // 1
            const basePriceAfterTax =  this.taxHelper.valueAfterTax(this.price, this.isImported, this.isTaxable) // Base on quantity of one
            const baseSalesTax =  parseFloat((this.priceAfterTax - this.price).toFixed(2)) // Base on quantity of one
            // 2
            this.priceAfterTax = parseFloat((basePriceAfterTax * this.quantity).toFixed(2))  //  base on quantity greater than or equal 1
            this.totalOfTax = parseFloat((baseSalesTax * this.quantity).toFixed(2)) // base on quantity greater than or equal 1


            if(this.updateParent) {
                console.log("update now")
                const payload = {
                    price: isNew ? this.priceAfterTax : basePriceAfterTax,
                    operation:updateType
                }
                this.storeReference.dispatch("onShoppingCartItemUpdated",payload )
            }


        } catch (e) {
        //    TODO: report failure

        }
    }
    updateItemQuantity(operation:"add"|"remove",removeMe?:()=>void):void{
        switch (operation) {
            case "add":
                this.quantity++
                this.setPriceAfterTax(false,"increment")
                break;
            case "remove": {
                if(this.quantity > 1) this.quantity-- // In case quantity still greater than one
                else removeMe?.() // is quantity is 1 then remove it
                this.setPriceAfterTax(false,"decrement")
                break


            }

        }


    }

    generateFakeId(prefix =  " "):string {
        const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        return  randLetter + Date.now();
    }








}
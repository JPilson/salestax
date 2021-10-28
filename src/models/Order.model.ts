import ProductModel from "@/models/Product.model";
import Utils from "@/utils/Utils";
import TaxHelper from "@/utils/TaxHelper";

interface OrderInterface {


    id?:string // reference
    products:Array<ProductModel>
    salesTax?:number
    totalAmount?:number
    totalOrder?:()=> number

}
export default class Order implements OrderInterface{
    readonly taxHelper = new TaxHelper()
    id!: string;
    products: Array<ProductModel> = [];
    salesTax = 0;
    totalAmount = 0;
    constructor(props?:OrderInterface) {
        const date = new Date();
        if(props){
            this.id = (date.getUTCHours().toString() + date.getDate().toString().toString() + date.getUTCFullYear().toString()).trim()
            this.products.push(...props.products)
            this.salesTax = props.salesTax ??0
            this.totalAmount = props.totalAmount ?? 0
        }
            // this.id = Utils.generateFakeId("order")

    }



    totalOrder(): number {
        return this.products.length ;
    }



}
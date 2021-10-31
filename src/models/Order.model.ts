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

    calculateTaxOrder():void {
        this.products.forEach(product => {
            product.setPriceAfterTax() // To make sure that the priceAfterTaxes is set
            this.salesTax = parseFloat((this.salesTax + product.totalOfTax).toFixed(2))
            this.totalAmount  =  parseFloat((this.totalAmount + product.priceAfterTax).toFixed(2))
        })
    }

    /**
     * For Test Purpose
     */
    printOrderDetails():string {
        let output = ""
        this.calculateTaxOrder();
        this.products.forEach(product => {
            output =  output +`\n${product.name}: ${product.priceAfterTax.toFixed(2)}`

        })
        output =  output +`\nSales Taxes: ${this.salesTax.toFixed(2)}\nTotal: ${this.totalAmount.toFixed(2)}`
        return output


    }



}
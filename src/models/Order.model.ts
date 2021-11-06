import ProductModel from "@/models/Product.model";
import TaxHelper from "@/utils/TaxHelper";
import {Store} from "vuex";

// eslint-disable-next-line @typescript-eslint/no-var-requires

export type priceUpdateType = "increment" | "decrement"

interface OrderInterface {


    id?:string // reference
    products:Array<ProductModel>
    salesTax?:number
    totalAmount?:number
    totalOrder?:()=> number,
    onProductPriceUpdated?:(price:number,tax:number,operation:priceUpdateType)=>void
    addNewItem?:(product:ProductModel)=>void

}
export default class Order implements OrderInterface{
    readonly taxHelper = new TaxHelper()
    id!: string;
    products: Array<ProductModel> = [];
    salesTax = 0;
    totalAmount = 0.0;
    storeRef!:Store<any> | undefined

    constructor(props?:OrderInterface,store?:Store<any>) {
        const date = new Date();
        this.storeRef = store
        if(props){
            this.id = (date.getUTCHours().toString() + date.getDate().toString().toString() + date.getUTCFullYear().toString()).trim()
            this.products.push(...props.products)
            this.salesTax = props.salesTax ??0
            this.totalAmount = props.totalAmount ?? 0

            this.calculateTaxOrder() // In case saved instance of shopping cart Exists.
        }

            // this.id = Utils.generateFakeId("order")
    }



    totalOrder(): number {
        return this.products.length ;
    }

    calculateTaxOrder(forProductAt?:number):void {
        if(forProductAt){
            // this.products[forProductAt]
            //TODO:
        }
        this.products.forEach(product => {
            // product.setPriceAfterTax(true) // To make sure that the priceAfterTaxes is set
            this.salesTax = parseFloat((this.salesTax + product.totalOfTax).toFixed(2))

        })
    }

    /**
     * @Function onProductPriceUpdated is used to notify the parent (Order) that the child (Product/item) prices
     * has been been updated
     * @param price
     * @param tax
     * @param operation
     */
    onProductPriceUpdated(price:number,tax:number,operation:priceUpdateType = 'increment'):void{
        try {

            if (operation === "increment") {
                this.totalAmount = parseFloat((this.totalAmount + price).toFixed(2))
                this.salesTax = parseFloat((this.salesTax + tax).toFixed(2))
            } else {
                if (this.totalAmount > 0) {
                    this.totalAmount = parseFloat((this.totalAmount - price).toFixed(2))
                }
                if(this.salesTax > 0){
                    this.salesTax = parseFloat((this.salesTax - tax).toFixed(2))

                }

            }
        } catch (e) {
            console.log(e)
        }

    }


    /**
     * For Test Purpose
     */
    printOrderDetails():string {
        let output = ""
        // this.calculateTaxOrder();
        this.totalAmount = 0
        this.products.forEach(product => {
            output =  output +`\n${product.quantity}${product.isImported? " imported":''} ${product.name}: ${product.priceAfterTax.toFixed(2)}`
           this.totalAmount =  parseFloat((this.totalAmount + product.priceAfterTax).toFixed(2))

        })
        output =  output +`\nSales Taxes: ${this.salesTax.toFixed(2)}\nTotal: ${this.totalAmount.toFixed(2)}`
        return output
    }

    /**
     *
     * @param product
     */
    addNewItem(product:ProductModel):void{

        product.updateParent = true
        if(this.storeRef)   product.setState= this.storeRef

        const payload= {
            operation:"insert",
            data:product
        }
        this.onProductPriceUpdated(product.priceAfterTax,product.totalOfTax);
       if(this.storeRef)
           this.storeRef.dispatch("updateShoppingCart",payload)
    }

    removeItem(itemIndex:number):void{
        if(this.products[itemIndex].quantity > 1){
            this.products[itemIndex].quantity--;
            return
        }

        this.products.splice(itemIndex,1);

    }



}
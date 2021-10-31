import {ProductCategory} from "@/models/Product.model";
enum TaxRate {
    basicSalesTax = 0.1,
    importTax= 0.05
}


export default class TaxHelper {
    constructor() {
    //   TODO
    }

    isProductTaxable(productCategory:ProductCategory):boolean {

        return !((productCategory === ProductCategory.food) || (productCategory === ProductCategory.medical) || (productCategory === ProductCategory.book))
    }

    /**
     *
     * Basic sales tax is applicable at a rate of 10% on all goods, except books, food, and medical products that are exempt.
     * @param price
     * @param isImported
     * @param isTaxable
     */
    valueAfterTax(price:number,isImported:boolean,isTaxable:boolean):number{

        let basicSalesTaxAmount = 0
        let importAmount = 0

        if(isImported)
            importAmount =  parseFloat((price * TaxRate.importTax).toFixed(2));

        if(isTaxable)
            basicSalesTaxAmount = parseFloat((price * TaxRate.basicSalesTax).toFixed(2));

        const roundedUpTaxAmount = this.roundUpPrice(basicSalesTaxAmount + importAmount);

        return parseFloat(( price + roundedUpTaxAmount).toFixed(2));
    }

    protected roundUpPrice(price: number, roundUpTo = 0.0):number {
        return   parseFloat((Math.ceil(price * 20.0 - roundUpTo)/20.0).toFixed(2))

    }




}
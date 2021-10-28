import {ProductCategory} from "@/models/Product.model";

enum TaxRate {
    salesTax = 1.1,
    importTax= 1.05
}

export default class TaxHelper {
    constructor() {
    //   TODO

    }

    /**
     * TODO:
     * @param productCategory
     */
    isProductTaxable(productCategory:ProductCategory):boolean {

        return !((productCategory === ProductCategory.food) || (productCategory === ProductCategory.medical) || (productCategory === ProductCategory.book))
    }

    /**
     * TODO: Calculate Value after Tax
     * Basic sales tax is applicable at a rate of 10% on all goods, except books, food, and medical products that are exempt.
     * @param price
     * @param isImported
     * @param isTaxable
     */
    valueAfterTax(price:number,isImported:boolean,isTaxable:boolean):number{

        let taxableAmount = 0
        let importAmount = 0

        if(isImported)
            importAmount = ((price * TaxRate.importTax) - price);

        if(isTaxable)
            taxableAmount = ((price * TaxRate.salesTax) - price);


        return parseFloat(( price + (taxableAmount + importAmount)).toFixed(2));
    }

    importedProductTaxRate(productPrice:number):number {
        return 0
    }

    /**
     * Todo: Calculate total value including tax
     */
    calculateTotalPrice():number {
        return 0
    }

    /**
     * TODO: Amount of SalesTax
     * The rounding rules for sales tax are that for a tax rate of n%, a shelf price of p contains (np/100 rounded up to the nearest 0.05) amount of sales tax.
     */
    orderAmountOfToSalesTax():number {

        return 0
    }


}
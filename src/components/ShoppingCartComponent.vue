<template>
  <div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from "vue-property-decorator";
import {ColorType} from "@/values/Colors";
import {LanguageType} from "@/values/Strings";
import Order from "@/models/Order.model";
import ProductModel, {ProductCategory} from "@/models/Product.model";

@Component({
  components: {},
})
export default class ShoppingCartComponent extends Vue {

  order = new Order({products:[
      new ProductModel({name:"Coding in War",isImported:false,price:12.49,category:ProductCategory.book}),
      new ProductModel({name:"CLB",isImported:false,price:14.99,category:ProductCategory.discography}),
      new ProductModel({name:"Chocolate",isImported:false,price:0.85,category:ProductCategory.food}),

    ]})
  // get order():Order {
  //   return this.$store.getters.orders
  // }
  taxOrders():void {
    this.order.products.forEach(product => {
      product.setPriceAfterTax()
      this.order.salesTax = parseFloat((this.order.salesTax + product.totalOfTax).toFixed(2))
      this.order.totalAmount  =  parseFloat((this.order.totalAmount + product.priceAfterTax).toFixed(2))
    })
    this.printDetails()
  }
  printDetails():void {
    this.order.products.forEach(product => {
      console.log(`${product.name}: ${product.priceAfterTax}`)
    })
    console.log("Sales Tax: ",this.order.salesTax)
    console.log("Total: ",this.order.totalAmount)
  }

  get colors(): ColorType {
    return this.$store.getters.colors;
  }
  // responsible

  get strings(): LanguageType {
    return this.$store.getters.strings;
  }

  get isDark(): boolean {
    return this.$store.getters.isDark;
  }
  mounted(): void {
   this.taxOrders()

  }
}
</script>


}
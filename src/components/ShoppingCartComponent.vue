<template>
  <div>
    <div class="ma-10 pa-10" >
      <TextView :text="''"/>
      <TextView :text="receipt" />
    </div>
    <v-btn ref="renderBtn" @click="renderReceipt" >
<!--      <TextView text="Show Receipt" />-->
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from "vue-property-decorator";
import {ColorType} from "@/values/Colors";
import {LanguageType} from "@/values/Strings";
import Order from "@/models/Order.model";
import ProductModel, {ProductCategory} from "@/models/Product.model";
import TextView from "@/utils/UI/TextView/TextView.vue";

@Component({
  components: {TextView},
})
export default class ShoppingCartComponent extends Vue {

  @Prop({})
  message!:string;

   receipt = ""
  @Prop({default:new Order({products:[
        new ProductModel({name:"Coding in War",isImported:false,price:12.49,category:ProductCategory.book}),
        new ProductModel({name:"CLB",isImported:false,price:14.99,category:ProductCategory.discography}),
        new ProductModel({name:"Chocolate",isImported:false,price:0.85,category:ProductCategory.food}),

      ]})})
  order!:Order
  // get order():Order {
  //   return this.$store.getters.orders
  // }

  renderReceipt():void{
    this.receipt = this.order.printOrderDetails();
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
   // this.taxOrders()

  }
}
</script>


}
<template>
  <v-flex class="  d-flex flex-column removeScroll " style="width: content-box; overflow: scroll;display: grid;
 align-items: center;" >
    <vs-dialog not-close v-model="dialogTrigger">
      <Receipt @done ="dialogTrigger = false"/>
    </vs-dialog>
    <v-flex class=" mt-10 " style="position: relative;  z-index: 1;  width: 100%;">
      <v-flex class="mx-3" >
        <TextView :text="utils.formatDate()" caps size="24" bold :color="colors.primaryText"/>
        <TextView :text="`${order.totalOrder()} Items`" size="18" bold :color="colors.primaryText" class="my-2"/>
        <TextView :text="`Sales Tax: ${utils.currency(order.salesTax)}`" size="14" bold :color="colors.primaryText"
                  class="my-2"/>
        <TextView :text="utils.currency(order.totalAmount)" size="24" bold :color="colors.primaryText" class="my-2"/>
        <v-divider dark style="height: 5px"/>
      </v-flex>
    </v-flex>

    <v-flex class="d-flex flex-column justify-end mx-4 " style=";width: 95%; height: 70%;">
<!--      <TextView :text="receipt" :color="colors.primaryText"/>-->
      <v-flex style="position: relative;overflow: scroll;margin-bottom: 20px;" class="removeScroll">
        <ProductComponent type="cartItem" v-for="(product,index) in order.products" :key="`order_item_${index}`" :product="product" :invert-theme="true" @onAdd="addOneMore(index)" @onRemove="removeOne(index)" />

      </v-flex>
    </v-flex>

    <v-flex class="d-flex flex-column justify-end center " style="position: relative; bottom: 10px; width: 100% "  >
      <div class="mx-2">
        <v-btn block ref="renderBtn" @click="showDialog()" depressed min-height="60" style="border-radius: 20px;  ">
          <TextView text="Order" bold/>
        </v-btn>
      </div>

    </v-flex>
  </v-flex>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from "vue-property-decorator";
import Colors, { ColorType} from "@/values/Colors";
import {LanguageType} from "@/values/Strings";
import Order from "@/models/Order.model";
import TextView from "@/utils/UI/TextView/TextView.vue";
import ProductComponent from "@/components/ProductComponent.vue";
import Utils from "@/utils/Utils";
import Receipt from "@/components/Receipt.vue";


@Component({
  components: {Receipt, ProductComponent, TextView},
})
export default class ShoppingCartComponent extends Vue {

  @Prop({})
  message!:string;
  utils = Utils
  dialogTrigger = false

  get order():Order {
    return this.$store.getters.shoppingCart
  }
  private showDialog():void {
    this.dialogTrigger = true
  }

  // get order():Order {
  //   return this.$store.getters.orders
  // }

  renderReceipt():void{
    // this.receipt = this.order.printOrderDetails();
  }

  addOneMore(productIndex:number):void{
     this.order.products[productIndex].updateItemQuantity("add")

  }
  removeOne(productIndex:number):void{
    this.order.products[productIndex].updateItemQuantity("remove",()=>{
      this.order.removeItem(productIndex)
    })

  }



  get isDark(): boolean {
    return this.$store.getters.isDark;
  }
  get colors(): ColorType {

    return this.isDark ? Colors.light : Colors.dark
  }
  // responsible

  get strings(): LanguageType {
    return this.$store.getters.strings;
  }


  mounted(): void {
   // this.taxOrders()

  }
}
</script>

<style>

.wrapper {
  display: grid;
  grid-template-rows: 20% 60% 20%;
}

</style>


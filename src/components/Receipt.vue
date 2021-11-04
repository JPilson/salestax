<template>
  <v-flex xs12 >
    <div class="mx-4">
      <TextView text="Receipt" bold/>
      <v-flex d-flex justify-space-between>
        <TextView text="Order: 8470053"/>
        <TextView :text="utils.formatDate()" caps/>
      </v-flex>
    </div>
    <v-flex >
      <TextView text="Payment Summary" bold  size="18" class="mt-10 mb-5 mx-4"/>
      <v-simple-table class="elevation-0" style="background-color: transparent">
        <template v-slot:default>
          <thead>
          <tr>
            <th v-for="(header,index) in tableHeader" :key="`header_${index}`" :class="`${header.position}`">
              <TextView :text="header.name" color="black" bold />
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in order.products"
              :key="`item_${index}`"
          >
            <td class="text-left" >{{ item.name }}</td>
            <td class="text-center">{{ item.quantity }}</td>
            <td class="text-right">{{ utils.currency(item.priceAfterTax) }}
                <v-btn icon class="mx-2" @click="removeOne(index)">
                  <v-icon v-text="`delete`" small />
                </v-btn>
            </td>
          </tr>
          </tbody>

        </template>
      </v-simple-table>
      <v-divider style="background-color: black" />
      <v-flex class="my-10" >
        <v-flex d-flex justify-space-between>
          <TextView text="Sales Tax" size="14"  />
          <TextView  :text="utils.currency(order.salesTax)"/>
        </v-flex>
        <v-flex d-flex justify-space-between class="mt-5">
          <TextView text="Total" size="24" bold />
          <TextView  :text="utils.currency(order.totalAmount)" size="24" bold />
        </v-flex>
      </v-flex>

    </v-flex>
    <div class="mx-2">
      <v-btn block ref="renderBtn" depressed min-height="60" style="border-radius: 20px;  " @click="done">
        <TextView text="Done" bold/>
      </v-btn>
    </div>
  </v-flex>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from "vue-property-decorator";
import {ColorType} from "@/values/Colors";
import {LanguageType} from "@/values/Strings";
import TextView from "@/utils/UI/TextView/TextView.vue";
import Order from "@/models/Order.model";
import Utils from "@/utils/Utils";

@Component({
  components: {TextView},
})
export default class Receipt extends Vue {
  tableHeader = [{name:"Items",position:"text-left"},{name:"Quantity",position:"text-center"},{name:"Price",position:this.$store.getters.isMobile?"text-center":"text-right"},]
  utils = Utils

  done():void {
    this.$store.commit("createNewOrder");
    this.$emit("done")
  }


  removeOne(productIndex:number):void{
    this.order.products[productIndex].updateItemQuantity("remove",()=>{
      this.order.products.splice(productIndex,1)
    })

  }


  get colors(): ColorType {
    return this.$store.getters.colors;
  }
  get order():Order {
    return this.$store.getters.shoppingCart
  }

  get strings(): LanguageType {
    return this.$store.getters.strings;
  }

  get isDark(): boolean {
    return this.$store.getters.isDark;
  }
  get isMobile():boolean {
    return  this.$store.getters.isMobile
  }
}
</script>


}
<template>
  <div class="centered xs12 d-flex">
      <v-flex :class="isMobile?'':'ma-5 pa-5 xs9 removeScroll'  "
              style="position: relative; overflow: scroll;border-radius: 30px;"
              :style="`height:${isMobile?'100%':'95vh'};background-color: #F5F5F5;`">
<!--        <v-flex d-flex class="justify-end " v-if="!isMobile">-->
<!--          <button style="border-radius: 10px; background-color: #e7e7e7 " v-ripple-->
<!--                  class="mx-2 pa-2  v-ripple__animation&#45;&#45;enter">-->
<!--            <v-icon v-text="`grid_view`" color="black" large/>-->
<!--          </button>-->
<!--          <button style="border-radius: 10px; background-color: #e7e7e7 " v-ripple-->
<!--                  class="pa-2  v-ripple__animation&#45;&#45;enter">-->
<!--            <v-icon v-text="`list`" color="black" large/>-->
<!--          </button>-->
<!--        </v-flex>-->
        <v-flex class="centered">
          <v-row class="my-5 ma-0 pa-0">
            <ProductComponent v-for="(product, index) in productList" type="grid" :key="`product${index}`"
                              :product="product" :class="isMobile?'ma-1':'mx-3 my-10'" @onAdd="onAddToCart(product)"/>
          </v-row>
        </v-flex>
      </v-flex>

    <v-flex v-if="!isMobile" class="d-flex flex-column mr-2 "   style="background-color: black; height:95vh; border-radius: 30px" >
          <ShoppingCartComponent  />
    </v-flex>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from "vue-property-decorator";
  import TextView from "@/utils/UI/TextView/TextView.vue";
  import ShoppingCartComponent from "@/components/ShoppingCartComponent.vue";
  import Assets from "@/assets/Assets";
  import ProductComponent from "@/components/ProductComponent.vue";
  import ProductModel from "@/models/Product.model";
  import {updateInterface} from "@/store";
  import Receipt from "@/components/Receipt.vue";

  @Component({
    components: {
      Receipt,
      ProductComponent,
      ShoppingCartComponent,
      TextView

    },
  })
  export default class Home extends Vue {
    readonly img = Assets.image
    showReceiptDialog = true
    get productList():Array<ProductModel> {
      return this.$store.getters.products
    }
    get isMobile():boolean {
      return this.$store.getters.isMobile
    }


    product = new ProductModel()

    onAddToCart(product:ProductModel):void{
      this.$store.state.shoppingCart.addNewItem(product)
    }

    mounted(): void {
    //
    }



  }
</script>

<style >
  .centered {
      display: grid;
      justify-content: center;
    align-items: center;
  }
  .removeScroll::-webkit-scrollbar {
    display: none;
  }
</style>

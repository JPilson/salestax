<template>
  <div>
    <vs-dialog overflow-hidden scroll full-screen v-model="showCart"  >
      <ShoppingCartComponent style="right: 25px;top:-10px"/>
    </vs-dialog>
    <v-bottom-navigation height="70" color="transparent" app class="elevation-0 py-3  align-center"
                         active-class="activeMenu">
      <v-spacer/>
      <v-btn @click="()=> this.shoppingCart = true">
        <vs-avatar badge-position="top-right">
          <v-icon v-text="`shopping_basket`"/>
          <template #badge>
            {{ shoppingCart.totalOrder() }}
          </template>
        </vs-avatar>

        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn ref="renderBtn" class="mr-2" color="#F5F5F5" depressed min-width="180" height="50"
             style="border-radius: 11px">
        <TextView text="Check Out" spacing="0" :size="dimension.normalText" bold color="black"/>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from "vue-property-decorator";
import {ColorType} from "@/values/Colors";
import {LanguageType} from "@/values/Strings";
import TextView from "@/utils/UI/TextView/TextView.vue";
import Order from "@/models/Order.model";
import {dimensionType} from "@/values/dimension";
import ShoppingCartComponent from "@/components/ShoppingCartComponent.vue";

@Component({
  components: {ShoppingCartComponent, TextView},
})
export default class BottomMenu extends Vue {
  activeTab = 0
  showCart =  true
  get colors(): ColorType {
    return this.$store.getters.colors;
  }

  get strings(): LanguageType {
    return this.$store.getters.strings;
  }

  get isDark(): boolean {
    return this.$store.getters.isDark;
  }
  get dimension():dimensionType {
    return  this.$store.getters.dimensions
  }
  get shoppingCart():Order {
    return  this.$store.getters.shoppingCart
  }
}
</script>
<style>
  .activeMenu {
    border-radius: 8px;

  }
</style>
<template>
  <div>
    <div v-if="typeProp === 'cartItem'">
      <v-flex >
        <v-flex d-flex justify-space-between align-center>
          <div>
            <TextView :text="productSync.name" bold :color="colors.primaryText"/>
            <TextView :text="productSync.category" :color="colors.primaryText" size="10" caps/>
          </div>
          <TextView :text="utils.currency(productSync.price)" :color="colors.primaryText" />
        </v-flex>
        <v-flex d-flex justify-space-between align-center>
          <TextView text="Imported"  :color="colors.primaryText" v-if="productSync.isImported" />
        </v-flex>
        <v-flex d-flex justify-space-between align-center>

          <TextView :text="`Quantity(${productSync.total})`"  :color="colors.primaryText" />
          <v-flex d-flex justify-end algin-center>
            <v-btn icon>
              <v-icon v-text="`remove`" :color="colors.primaryText" @click="onRemoveClicked" />
            </v-btn>
            <v-btn @click="onAddClicked"  icon style="background: #00FF6837; border-radius: 8px" small>
              <v-icon v-text="`add`" :color="colors.primaryText" />
            </v-btn>
          </v-flex>
        </v-flex>
        <v-divider dark class="my-1"  />

      </v-flex>
    </div>
    <div class="d-flex  " v-else-if="typeProp === 'list'">
      <div>
        <v-img :src="productSync.img" width="120" height="120" style="border-radius: 10px"/>
      </div>
      <v-flex class="d-flex flex-column pa-2  " xs12>
        <v-flex class="ml-2">
          <TextView :text="productSync.name" bold size="18" style="max-width: 200px"/>
          <TextView :text="utils.currency(productSync.price)" size="12"/>
          <TextView text="Imported" size="10" caps v-if="productSync.isImported"/>
        </v-flex>


        <v-flex class="d-flex flex-column justify-end">
          <v-btn depressed style="border-radius: 8px; background-color: white; width: fit-content">
            <TextView text="Add to Cart" size="12" spacing="0" bold transform="capitalize"/>
          </v-btn>
        </v-flex>
      </v-flex>
    </div>
    <div v-else style="background-color: white; border-radius: 18px; height: 100%" class="d-flex  flex-column pa-2">
      <v-img :src="productSync.img" :width="dimensions.imageOfProductInGrid" :height="dimensions.imageOfProductInGrid - 70" style="border-radius: 18px" />
      <v-flex class="pa-3 d-flex flex-column justify-end">
        <v-flex>
          <TextView :text="productSync.name" bold :size="dimensions.normalText" :style="`max-width: ${dimensions.imageOfProductInGrid-50}px`"/>
          <TextView text="Imported" size="10" caps v-if="productSync.isImported"/>
        </v-flex>

        <v-flex d-flex class="align-center justify-end" xs12 >
          <v-flex d-flex justify-start>
            <TextView :text="utils.currency(productSync.price)" size="12"/>
          </v-flex>
          <v-flex class="d-flex justify-end">
            <v-btn depressed style="border-radius: 8px; background-color: #C4C4C430; width: fit-content" @click="onAddClicked">
              <TextView text="Add to Cart" :size="dimensions.buttonText" spacing="0" bold transform="capitalize"/>
            </v-btn>
          </v-flex>
        </v-flex>
      </v-flex>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop, PropSync} from "vue-property-decorator";
import Colors, {ColorType} from "@/values/Colors";
import {LanguageType} from "@/values/Strings";
import TextView from "@/utils/UI/TextView/TextView.vue";
import ProductModel from "@/models/Product.model";
import Utils from "@/utils/Utils";
import {dimensionType} from "@/values/dimension";

@Component({
  components: {TextView},
})
export default class ProductComponent extends Vue {
  constructor() {
    super();
  }
  @PropSync('product',{required:true})
  productSync!: ProductModel

  @PropSync("type",{default:'grid'})
  typeProp!: 'list'| 'grid' |'cartItem'

  @Prop()
  invertTheme!:boolean
  // @Prop()
  // private onRefresh!: (done: () => void) => void



  readonly  utils = Utils;

  private onAddClicked():void{
   this.$emit("onAdd")
    // this.onAdd()
  }

  private onRemoveClicked():void{
    this.$emit("onRemove")
   // this.onRemove()
  }

  get colors(): ColorType {
    return this.invertTheme ? this.isDark ? Colors.light : Colors.dark : this.$store.getters.colors;
  }

  get strings(): LanguageType {
    return this.$store.getters.strings;
  }

  get isDark(): boolean {
    return this.$store.getters.isDark;
  }
  get dimensions():dimensionType{
    return this.$store.getters.dimensions
  }
}
</script>


}
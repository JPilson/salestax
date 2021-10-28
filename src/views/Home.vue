<template>
  <div>
    <TextView text="Sales tax" />

    <ShoppingCartComponent/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import HelloWorld from '../components/HelloWorld.vue'
  import {Component} from "vue-property-decorator";
  import TextView from "@/utils/UI/TextView/TextView.vue";
  import Utils from "@/utils/Utils";
  import ShoppingCartComponent from "@/components/ShoppingCartComponent.vue";

  @Component({
    components: {
      ShoppingCartComponent,
      TextView

    },
  })
  export default class Home extends Vue {

    mounted(): void {
    //
    }

  }
</script>

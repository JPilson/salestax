<template>
  <div>
    <TextView text="Sales tax" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import HelloWorld from '../components/HelloWorld.vue'
  import {Component} from "vue-property-decorator";
  import TextView from "@/utils/UI/TextView/TextView.vue";

  @Component({
    components: {
      TextView

    },
  })
  export default class Home extends Vue {



  }
</script>

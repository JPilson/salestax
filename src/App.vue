<template>
  <v-app  >
    <v-main>
      <router-view/>
    </v-main>
    <BottomMenu v-if="isMobile" />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Utils from "@/utils/Utils";
import {Component} from "vue-property-decorator";
import BottomMenu from "@/components/BottomMenu.vue";

@Component({
  components: {
    BottomMenu

  },
})
export default class App extends Vue {
   mediaQueryList!: MediaQueryList

  get isAppDark():boolean {
    return this.$store.getters.isAppDark
  }
  get isMobile():boolean {
     return  this.$store.getters.isMobile
  }
  onResize():void{
    const isMobile = window.innerWidth < 600;
    this.$store.commit("onScreenResize",isMobile);
  }

  beforeMount():void{
    this.onResize()
    this.mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    Utils.onThemeChange(this.mediaQueryList,this.$vuetify.theme)
    window.addEventListener('resize', this.onResize, { passive: true })
    this.mediaQueryList.addEventListener("change",(theme)=> {
      Utils.onThemeChange(theme,this.$vuetify.theme)
    })
  }
  beforeDestroy ():void {

    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.onResize)
    this.mediaQueryList.removeEventListener("change",()=>{
    //
    })
  }


}



</script>

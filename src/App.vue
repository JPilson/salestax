<template>
  <v-app  >
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Utils from "@/utils/Utils";
import {Component, Watch} from "vue-property-decorator";

@Component({
  components: {

  },
})
export default class App extends Vue {

  get isAppDark():boolean {
    return this.$store.getters.isAppDark
  }

  beforeMount():void{
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

    Utils.onThemeChange(systemTheme,this.$vuetify.theme)
    systemTheme.addEventListener("change",(theme)=> {

      Utils.onThemeChange(theme,this.$vuetify.theme)
    })
    /**
     * TODO
     * 1- Create Project
     * 2
     */
  }


}



</script>

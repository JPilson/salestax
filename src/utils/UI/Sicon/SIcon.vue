<template>

<!--    <div v-html="svgCodes['home']"/>-->
  <div class="d-flex align-center" >
    <img :width="width" :src="icon" alt="icon" >
  </div>

<!--      <v-img  :src="icon" />-->




</template>

<script lang="ts">
    import Vue from "vue"
    import Component from "vue-class-component";
    import TextView from "@/utils/UI/TextView/TextView.vue";
    import Notify, {notificationTypes} from "@/utils/UI/Toast/Notify";
    import {Prop} from "vue-property-decorator";


    @Component({
        components: {TextView},
    })
    export default class SIcon extends Vue{
       //VARIABLES DECLARATION HERE
      @Prop({default: '#67badb'})
      color!: string

      @Prop({})
      icon!: string

      @Prop({})
      height!: any

      @Prop({})
      width!: any

      iconColor = "#fff"

      svgCodes = {
        home:` <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
           <path class="sicon"  d="M9 9H1V2.5A1.5 1.5 0 012.5 1H9v8zM9 11v8H2.5A1.5 1.5 0 011 17.5V11h8zM11 11v8h6.5a1.5 1.5 0 001.5-1.5V11h-8zM15 1a1 1 0 011 1v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0V6h-2a1 1 0 110-2h2V2a1 1 0 011-1z"
          fill="#67badb"/> </svg>`
      }


       
       /**
       COMPUTED PROPERTIES HERE (getter and Setters)
       **/
       
       
       
       /**
       Life-Hook 
       **/
       mounted():void {
       //

       }
       
       /** Methods & watchers
       //@Watch('trigger')
        //onPropertyChanged(flag:boolean,oldFlag:boolean){}
       */






    }
</script>

<style scoped>
.sicon{
  fill: #309696;
}
</style>
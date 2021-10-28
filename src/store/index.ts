import Vue from 'vue'
import Vuex, {ActionContext} from 'vuex'
import Colors, {AppTheme} from "@/values/Colors";
import Strings from "@/values/Strings";
import Order from "@/models/Order.model";
import ProductModel, {ProductCategory} from "@/models/Product.model";


interface updateInterface<T>  {
  data:T,
  at?:number,
  operation:"delete" | "update" | "replace" | "insert"
}

const theme:AppTheme = AppTheme.dark
const products =   [ new ProductModel({name:"Coding in War",isImported:false,price:12.49,category:ProductCategory.book}),
  new ProductModel({name:"Chocolate",isImported:false,price:0.85,category:ProductCategory.food}),
  new ProductModel({name:"CLB",isImported:false,price:16.49,category:ProductCategory.discography})]

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    theme: theme as AppTheme,
    values:{
      colors:Colors[theme],
      strings:Strings.en
    },
    orders:[] as Array<Order>,
    shoppingCart: new Order({products:products}),
    products:products as Array<ProductModel>


  },
  mutations: {
    changeAppTheme (state,selectedTheme:AppTheme){
      state.theme = selectedTheme
      state.values.colors = Colors[selectedTheme]
    },
    updateOrderList(state, payload:updateInterface<Order>):void{
      switch (payload.operation) {
        case "delete":{
          const index = payload.at ?? state.orders.findIndex(item => item.id == payload.data.id)
          state.orders.splice(index);
          break
        }
        case "insert":
          state.orders.push(payload.data)
          break
        case "replace" || "update": {
          const index = payload.at ?? state.orders.findIndex(item => item.id == payload.data.id)
          state.orders[index] = payload.data
          break
        }
      }




    }


  },
  actions: {
    changeAppTheme(context,payload:AppTheme){
      context.commit("changeAppTheme",payload)
    },
    updateOrderList(context:ActionContext<any, any>, payload:updateInterface<Order>){
      context.commit("updateOrderList",payload)
    }

  },
  modules: {
  },

  getters:{
    isAppDark(state):boolean {
      return state.theme == AppTheme.dark
    },
    orders(state):Array<Order>{
      return state.orders
    },
    shoppingCart(state):Order {
      return state.shoppingCart
    },
    products(state):Array<ProductModel>{
      return state.products
    }
  }

})

import Vue from 'vue'
import Vuex, {ActionContext} from 'vuex'
import Colors, {AppTheme} from "@/values/Colors";
import Strings from "@/values/Strings";
import Order, {priceUpdateType} from "@/models/Order.model";
import ProductModel, {ProductCategory} from "@/models/Product.model";
import Assets from "@/assets/Assets";
import dimension, {dimensionType} from "@/values/dimension";


export interface updateInterface<T>  {
  data:T,
  at?:number,
  operation:"delete" | "update" | "replace" | "insert"
}

const theme:AppTheme = AppTheme.light
const products =   [
    new ProductModel({name:"Book",isImported:false,price:12.49,category:ProductCategory.book,img:Assets.image.book}),
    new ProductModel({name:"CLB",isImported:false,price:14.99,category:ProductCategory.discography,img:Assets.image.cd}),
    new ProductModel({name:"Chocolate",isImported:false,price:0.85,category:ProductCategory.food,img:Assets.image.chocolate}),

  new ProductModel({name:"KitKat",isImported:true,price:10.00,category:ProductCategory.food,img:Assets.image.kitkat}),
    new ProductModel({name:"Zara Perfume",isImported:true,price:47.50,category:ProductCategory.other,img:Assets.image.zaraPerfume}),

  new ProductModel({name:"LV Perfume",isImported:true,price:27.99,category:ProductCategory.other,img:Assets.image.zaraPerfume}),
  new ProductModel({name:"Perfume",isImported:false,price:18.99,category:ProductCategory.other,img:Assets.image.perfume}),
    new ProductModel({name:"Headache Pills",isImported:false,price:9.75,category:ProductCategory.medical,img:Assets.image.headPills}),
  new ProductModel({name:"Squid Chocolate",isImported:true,price:11.25,category:ProductCategory.food,img:Assets.image.kitkat}),

  // new ProductModel({name:"Random Access Memory",isImported:false,price:20.49,category:ProductCategory.discography,img:Assets.image.daftPunk}),



]

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    theme: theme as AppTheme,
    values:{
      colors:Colors[theme],
      strings:Strings.en,
      dimensions:dimension.mobile
    },
    isMobile:false,
    orders:[] as Array<Order>,
    shoppingCart: new Order(),
    products:products as Array<ProductModel>



  },
  mutations: {
    changeAppTheme (state,selectedTheme:AppTheme){
      state.theme = selectedTheme
      state.values.colors = Colors[selectedTheme]
    },
    /**
     * This function is used to update the the dimensions of the app for
     * better responsiveness
     * @param state
     * @param payload
     */
    onScreenResize(state,payload:boolean){
      state.isMobile = payload
      state.values.dimensions =state.isMobile? dimension.mobile: dimension.default
    },

    /**
     * This function is responsible to manage list of Orders
     * @param state
     * @param payload
     */
    updateOrderList(state, payload:updateInterface<Order>):void{
      switch (payload.operation) {
        case "delete":{
          const index = payload.at ?? state.orders.findIndex(item => item.id == payload.data.id)
          state.orders.splice(index,1);
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
    },

    /**
     *
     * @param state
     * @param payload
     */
    updateShoppingCart: function (state, payload: updateInterface<ProductModel>): void {
      switch (payload.operation) {
        case "insert":
          state.shoppingCart.products.push(payload.data);
          break;
        case "replace":
          state.shoppingCart.products[payload.at!] = payload.data;
          break;
        case "delete":
          state.shoppingCart.products.splice(payload.at!, 1);
          break;
        default:
          break;
      }
    },

    /**
     *
     * @param state
     */
    createNewOrder(state):void{
      state.shoppingCart =  new Order();
    },
    onShoppingCartItemUpdated(state,payload: {price:number,tax:number,operation:priceUpdateType}):void{
      state.shoppingCart.onProductPriceUpdated(payload.price,payload.tax,payload.operation)
    }

  },
  actions: {
    changeAppTheme(context,payload:AppTheme){
      context.commit("changeAppTheme",payload)
    },
    updateOrderList(context:ActionContext<any, any>, payload:updateInterface<Order>){
      context.commit("updateOrderList",payload)
    },
    updateShoppingCart(context:ActionContext<any, any>, payload:updateInterface<ProductModel>){
      context.commit("updateShoppingCart",payload)
    },
    onShoppingCartItemUpdated(context:ActionContext<any, any>, payload){
      context.commit("onShoppingCartItemUpdated",payload)
    },


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
    },
    theme(state) {
      return state.theme
    },
    isMobile(state):boolean{
      return  state.isMobile
    },
    dimensions(state):dimensionType{
      return state.values.dimensions
    }

  }

})

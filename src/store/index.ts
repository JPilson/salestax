import Vue from 'vue'
import Vuex from 'vuex'
import Colors, {AppTheme} from "@/values/Colors";
import Strings from "@/values/Strings";


const theme:AppTheme = AppTheme.dark

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    theme: theme as AppTheme,
    values:{
      colors:Colors[theme],
      strings:Strings.en
    },
  },
  mutations: {
    changeAppTheme (state,selectedTheme:AppTheme){
      state.theme = selectedTheme
      state.values.colors = Colors[selectedTheme]
    },
  },
  actions: {
    changeAppTheme(context,payload:AppTheme){
      context.commit("changeAppTheme",payload)
    },
  },
  modules: {
  },

  getters:{
    isAppDark(state):boolean {
      return state.theme == AppTheme.dark
    }
  }

})

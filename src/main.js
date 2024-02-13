import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElIconModules from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import echarts from 'echarts'
import Vuex from 'vuex'

const app = createApp(App)
for (let iconName in ElIconModules) {
  app.component(iconName, ElIconModules[iconName])
}
const store = new Vuex.Store({
  state: {
    returnUrl: '' ,
    isLoggedIn: !!localStorage.getItem('loginData')
  },
  mutations: {
    SET_RETURN_URL(state, url) {
      state.returnUrl = url
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem('loginData');
    }
  }
})
app.use(store)

app.use(ElementPlus, {
  locale: zhCn
})
app.use(router)
app.use(ElIconModules)
app.use(ElementPlus)

app.mount('#app')

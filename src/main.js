import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { NavBar, Field, Button, Cell, CellGroup } from 'vant'
import 'amfe-flexible/index.js'
import './styles/index.less'
Vue.use(Field).use(Button).use(Cell).use(CellGroup).use(NavBar)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

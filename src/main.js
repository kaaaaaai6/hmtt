import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  NavBar,
  Field,
  Button,
  Cell,
  CellGroup,
  Toast,
  Tabbar,
  TabbarItem,
  List,
  Tab,
  Tabs,
  PullRefresh,
  Grid,
  GridItem,
  Image,
  ImagePreview,
  Icon,
  Lazyload,
  Popup
} from 'vant'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate/dist/vee-validate.full'
import zhCN from 'vee-validate/dist/locale/zh_CN' // 加载验证插件的语言包
import { relativeTime } from './utils/date' // 时间插件
import * as rules from 'vee-validate/dist/rules'
import 'amfe-flexible/index.js'
import './styles/index.less'

Vue.filter('relativeTime', relativeTime) // 时间过滤器
Vue
  .use(Field)
  .use(Button)
  .use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(List)
  .use(Tab)
  .use(Tabs)
  .use(PullRefresh)
  .use(Grid)
  .use(GridItem)
  .use(Image)
  .use(ImagePreview)
  .use(Lazyload)
  .use(Icon)
  .use(Popup)
Vue.config.productionTip = false

// 配置使用中文语言
for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: zhCN.messages[rule] // add its message
  })
}

// 手机号验证
extend('phone', {
  validate (value) {
    return /^1\d{10}$/.test(value)
  },
  message: '手机号格式错误'
})

// 全局加载组件
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// 创建实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

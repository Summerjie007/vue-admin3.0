import Vue from "vue";

//需要在顶部引入
import VueCompositionApi from '@vue/composition-api'; ;
Vue.use(VueCompositionApi)
import App from "./App.vue";
import router from "./router";
import store from "./store";


// 全局引入element-ui框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

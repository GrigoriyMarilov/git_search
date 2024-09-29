import Vue from 'vue'
import App from './App.vue'
import repoStore from "@/store/repoStore";
import {router} from "@/router/Router";

Vue.config.productionTip = false

new Vue({
  store: repoStore,
  render: h => h(App),
  router: router,
}).$mount('#app')

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './firebase/ConfigFirebase'
import * as vuefire from 'vuefire';

Vue.config.productionTip = false;
Vue.use(vuefire);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

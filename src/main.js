import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './firebase/ConfigFirebase'
import * as vuefire from 'vuefire';
import './../node_modules/bulma/css/bulma.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPaperPlane)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;
Vue.use(vuefire);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

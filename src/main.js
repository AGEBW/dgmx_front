import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

//añadir iconos globales
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFileEdit, mdiDelete, mdiEye,mdiClockTimeEight  } from '@mdi/js';


Vue.component('SvgIcon', SvgIcon);

// Añadir los iconos globalmente
Vue.prototype.$icons = {
  mdiFileEdit,
  mdiDelete,
  mdiEye,
  mdiClockTimeEight 
};

Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.use(Vuetify);


new Vue({
  vuetify: new Vuetify(),
  router,
  render: h => h(App),
}).$mount('#app')

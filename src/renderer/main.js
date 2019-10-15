import Vue from 'vue';
import {
  TimePicker,
  Button,
} from 'element-ui';

import App from './App';
import router from './router';
import store from './store';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
const eleComp = [
  TimePicker,
  Button,
];
eleComp.forEach(comp => Vue.use(comp));

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');

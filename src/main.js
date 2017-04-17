import Vue from 'vue';
import App from './App';
import router from './router';
import Ripple from './directives/Ripple';

Vue.config.productionTip = false;

Vue.directive('ripple', Ripple);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

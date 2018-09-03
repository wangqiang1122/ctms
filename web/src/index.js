import Vue from 'vue';
import ElementUI from 'element-ui';
import App from '@/Index.vue';
import router from '@/router';
import 'element-ui/lib/theme-chalk/index.css';
// import '@/theme/index.css';
import '@/theme/theme.css';
import '@/assets/common.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);
require('./proto');
require('./utils/tools');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

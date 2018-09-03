import Vue from 'vue';
import ElementUI from 'element-ui';
import Login from '@/Login.vue';
import 'element-ui/lib/theme-chalk/index.css';
// import '@/theme/index.css';
import '@/theme/theme.css';
import '@/assets/common.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#login',
  template: '<Login/>',
  components: { Login },
});

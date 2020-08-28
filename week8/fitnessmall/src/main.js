import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import jquery from 'jquery';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap';
import VueSwal from 'vue-swal';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import {
  ValidationObserver, ValidationProvider, configure, extend, localize,
} from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';

// 載入filter
import currencyFilter from './filters/currency';
// bus
import './bus';
import App from './App.vue';
import router from './router';

// scrollanimation, 參考影片: https://www.youtube.com/watch?v=NVgNUXsXn-s
// 覺得aos不好用，所以選擇用這個
import ScrollAnimation from './directives/scrollanimation';

// 將jquery設為全域
window.$ = jquery;

Vue.config.productionTip = false;

library.add(fas, far);

Vue.filter('currency', currencyFilter);

Vue.use(Loading, {
  canCancel: true, // default false
  color: '#000000',
  loader: 'dots',
  width: 64,
  height: 64,
  backgroundColor: '#ffffff',
  opacity: 0.5,
});
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(VueSwal);

Vue.component('Loading', Loading);

// Form表單驗證
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

// 添加驗證規則
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

// 加入 Bootstrap 樣式設定
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
    dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
  },
});

// 加入驗證的中文內容
localize('tw', zhTW);

Vue.directive('scrollanimation', ScrollAnimation);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueSwal from 'vue-swal';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// eslint-disable-next-line object-curly-newline
import { ValidationObserver, ValidationProvider, configure, extend, VeeValidate } from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW.json';
import VueI18n from 'vue-i18n';
import { required } from 'vee-validate/dist/rules';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

library.add(fas, far);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.component('loading', Loading);

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(VueSwal);

// 使用多國語系
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'zhTW',
});

Vue.use(VeeValidate, {
  events: 'input|blur',
  i18n,
  dictionary: {
    zhTW,
  },
});

// Form表單驗證
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

// 添加規則
extend('required', required);
// // extend('email', email);

// 加入 Bootstrap 樣式設定
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
    dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
    // ...
  },
});

new Vue({
  i18n,
  router,
  render: (h) => h(App),
}).$mount('#app');

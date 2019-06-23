import 'Styles/main.scss';
import '@fortawesome/fontawesome-free/css/all.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';

// register custom validation rules
import { minValue, maxValue } from 'Plugins/custom-validation'
VeeValidate.Validator.extend('required_min_value', minValue);
VeeValidate.Validator.extend('required_max_value', maxValue);

Vue.use(VueRouter)
Vue.use(Vuex);
Vue.use(VeeValidate);

// main component
import Main from './Main.vue';

// build routes
import routes from 'Router/routes'
const router = new VueRouter(routes)

// build store
import storeConfig from 'Store/company-store'
const store = new Vuex.Store(storeConfig)

// register mixins
import globalMixins from 'Mixins/global-mixins'
Vue.mixin(globalMixins)

new Vue({
  render: createElement => createElement(Main),
  router,
  store,
  el: '#app'
});

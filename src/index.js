import 'Styles/main.scss';
import '@fortawesome/fontawesome-free/css/all.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VeeValidate);

// main component
import Main from './Main.vue';

// build routes
import routes from 'Router/routes'
const router = new VueRouter(routes)

new Vue({
  render: createElement => createElement(Main),
  router,
  el: '#app'
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
//import 'font-awesome/css/font-awesome.css'; //doesn't work on dev server
import _ from 'lodash';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
Vue.use(VueResource);
Vue.use(VueRouter);
import bus from './components/bus';
import { store } from './store/index.js';

var host = 'todo.asmyshlyaev177.tk';
export { host };

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})


Vue.config.productionTip = false

/* eslint-disable no-new */
export default {
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
}
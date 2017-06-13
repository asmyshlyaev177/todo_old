<template>
  <div id="app">
    <AppHeader></AppHeader>   
    <AppMenu></AppMenu>
    <Todolist></Todolist>
    <nuxt/>
  </div>
</template>

<script>
import Vue from 'vue';
import router from '../router';
import AppHeader from '../components/Header';
import AppMenu from '../components/Menu';
import Todolist from '../components/Todolist';
import _ from 'lodash';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
Vue.use(VueResource);
Vue.use(VueRouter);
import bus from '../components/bus';
import { store } from '../store/index.js';
var host = '192.168.1.70:8080';

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})
 
 export default {
    store,
        components: {
        'AppHeader': AppHeader,
        'AppMenu': AppMenu,
        'Todolist': Todolist,
        'bus': bus
    },
    created() {
        this.$store.dispatch('fetchAllTodo')
    },
  
} 
</script>

<style>
#app {
@import '~bulma/css/bulma.css';
@import '../assets/icons.css';
}

@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;
}

    
.disabled, .disabled:hover {
  color: rgba(0, 0, 0, 0.35);
  cursor: not-allowed;
  user-select: none;
}
    
a {
  color: #363636;
}

a:hover {
  color: #00d1b2;;
}
   
.icon.myloader-container {
    width: 10em;
    height: 10em;
    display: block;
    position: relative;
    top: 3em;
    margin-left: auto;
    margin-right: auto;
    z-index: 20;
    color: rgba(113, 255, 120, 0.74);
}
    
i.myloader {
    font-size: 10em!important;
}
</style>

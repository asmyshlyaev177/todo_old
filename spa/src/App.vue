<template>
  <div id="app">
    
<AppHeader></AppHeader>   
<AppMenu></AppMenu>
      
   
<router-view></router-view>
      
  </div>
</template>



<script>
import AppHeader from './components/Header';
import AppMenu from './components/Menu';
import Todolist from './components/Todolist';

    
export default {
    name: 'app',
    data() {
        return this.$store.state
    },
        components: {
        'AppHeader': AppHeader,
        'AppMenu': AppMenu,
        'Todolist': Todolist
    },
    created() {
        this.$store.dispatch('fetchAllTodo')
    },
  
}
</script>

<style>
#app {
@import '~bulma/css/bulma.css';
@import './assets/icons.css';
}
 
/* spinner animation */
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
    display: flex;
    position: absolute;
    top: 3em;
    margin-left: auto;
    margin-right: auto;
    left: 45%;
    z-index: 20;
    color: rgba(113, 255, 120, 0.74);
}
    
i.myloader {
    font-size: 12em!important;
}
</style>

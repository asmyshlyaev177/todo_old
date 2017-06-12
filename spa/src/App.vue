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
    position: absolute;
    top: 3em;
    margin-left: auto;
    margin-right: auto;
    left: 45%;
    z-index: 20;
    color: rgba(113, 255, 120, 0.74);
}
    
i.fa-spinner.myloader {
    font-size: 10em!important;
}
</style>

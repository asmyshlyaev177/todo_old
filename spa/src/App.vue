<template>
  <div id="app">
    
<AppHeader></AppHeader>   
<AppMenu></AppMenu>
      

<section>
<div class="container">
<div class="columns is-multiline">
    

<Todo></Todo>
<Todo></Todo>
<Todo></Todo>
<Todo></Todo>

</div>
</div>
</section>
      
      
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import AppHeader from './components/Header'
import AppMenu from './components/Menu'
import Todo from './components/Todo'
export default {
  name: 'app',
  components: {
    'AppHeader': AppHeader,
    'AppMenu': AppMenu,
    'Todo': Todo
  }
}
</script>

<style>
#app {
@import '~bulma/css/bulma.css';
}
</style>

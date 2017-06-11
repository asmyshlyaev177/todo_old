<template>
  <div id="app">
    
<AppHeader></AppHeader>   
<AppMenu :active="active" @changeMenu="ChangeActiveMenu" ></AppMenu>
      

<section>
<div class="container">
<div class="columns is-multiline">
  
<Todo v-if="newTodo.addingNew" :todo="newTodo" ></Todo>

<span v-if="fetching" class="icon is-large myloader-container">
    <i class="fa fa-spin fa-spinner fa-6 myloader">
    </i>
</span>
<Todo v-else v-for="todo in todolistFiltered" :key=todo.id :todo="todo" ></Todo>


    
</div>
</div>
</section>
      
      
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import AppHeader from './components/Header';
import AppMenu from './components/Menu';
import Todo from './components/Todo';
import Vue from 'vue';
    
export default {
    name: 'app',
    data() {
        return this.$store.state
    },
        components: {
        'AppHeader': AppHeader,
        'AppMenu': AppMenu,
        'Todo': Todo
    },
    computed: {
      todolistFiltered() {
          switch(this.active) {
                 case 'all':
                    return this.todolist;
                 case 'pending':
                    return _.filter(this.todolist, ['complete', false]);
                 case 'completed':
                    return _.filter(this.todolist, ['complete', true]);
                 }
      }  
    },
    created() {
        this.$store.dispatch('fetchAllTodo')
    },
    methods: {
        ChangeActiveMenu(val) {
            this.$store.commit('ChangeActiveMenu', val);
        }
    }
  
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

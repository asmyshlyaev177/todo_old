<template>
<div>
    <section>
        <div class="container">
            <div class="columns is-multiline">

            <Todo v-if="newTodo.addingNew" :todo="newTodo" ></Todo>

            <span v-if="fetching" class="icon is-large myloader-container">
                <i class="icon-spinner myloader">
                </i>
            </span>
            <Todo v-else v-for="todo in todolistFiltered" :key=todo.id :todo="todo" ></Todo>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import store from '../main.js';
import Todo from './Todo';

export default {
    data() {
        return this.$store.state
    },
    components: {
        'Todo': Todo
    },
    computed: {
      routePath() {
          return this.$route.path
      },
      todolistFiltered() {
          switch(this.routePath) {
                 case '/' || '/all':
                    return this.todolist;
                 case '/pending':
                    return _.filter(this.todolist, ['complete', false]);
                 case '/completed':
                    return _.filter(this.todolist, ['complete', true]);
                 }
      }  
    }
}
</script>
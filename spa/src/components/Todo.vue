<template>
<div class="column is-6-desktop is-12-tablet">
<div class="card">
  <header class="card-header">
    <div class="column is-1 has-text-left todo-completed">
        <span v-if="todoCompleted" class="icon"><i class="fa fa-check fa-lg"></i></span>
    </div>
    <p v-if="!editing" class="card-header-title" :class="{finished: todoCompleted}" >
      {{ todo.title }}
    </p>
      <p v-else class="card-header-title" :style="inputStyle">
<!-- input for edit todo-->
        <input ref="title" v-focus class="input" v-bind:value="todo.title" type="text" placeholder="Text input">
      </p>
    <a v-if="!editing && !deleting" @click="editTodo" class="card-header-icon">
<!-- edit title button-->
      <span class="icon">
        <i class="fa fa-pencil"></i>
      </span>
    </a>
<!-- save button-->
    <a v-if="editing && !newTodo" @click="saveTodoTitle" class="card-header-icon">
      <span class="icon">
        <i class="fa fa-check"></i>
      </span>
    </a>
  </header>
    
  <div class="card-content">
      
<AppTask v-for="taskEl in todo.task" :task="taskEl" :key=taskEl.id></AppTask>
<AppTask v-if="newTask.addingNew" :task="newTask"
         @saveNewTask="saveNewTask" @discardNewTask="discardNewTask"></AppTask>
      
  </div>
    
  <footer class="card-footer">
      <a v-if="!deleting && !newTodo" @click="addTask" :class="{ disabled: disabled }" class="card-footer-item">
          <span class="icon"><i class="fa fa-plus"></i></span>
              <span>Add task</span>
      </a>
      <a v-if="!deleting && !newTodo" @click="clickDelete" :class="{ disabled: disabled }" class="card-footer-item">
          <span class="icon"><i class="fa fa-trash-o"></i></span>
              <span>Delete</span>
      </a>
      <a v-if="deleting && !newTodo" @click="deleteThisTodo" class="card-footer-item">
          <span class="icon"><i class="fa fa-check"></i></span>
              <span>Sure!</span>
      </a>
      <a v-if="deleting && !newTodo" @click="deleting=false" class="card-footer-item">
          <span class="icon"><i class="fa fa-ban"></i></span>
              <span>Nope</span>
      </a>  
<!-- buttons for new todo -->
       <a v-if="newTodo" @click="saveNewTodo" class="card-footer-item">
          <span class="icon"><i class="fa fa-check"></i></span>
              <span>Ok</span>
       </a>   
       <a v-if="newTodo" @click="discardNewTodo" class="card-footer-item">
          <span class="icon"><i class="fa fa-ban"></i></span>
              <span>Cancel</span>
       </a>
      
      
  </footer>
</div>
</div>
</template>

<script>
import AppTask from './Task';
import bus from './bus';

export default {
    props: ['todo'],
    created() {
        bus.$on('new-task', function(id) {
            if (id == this.todo.id) {
                this.newTask.addingNew = false
            }
        }.bind(this));
        if (this.todo.addingNew) {
            this.editing = true
        }
    },
    data() {
        return {
            editing: false,
            deleting: false,
            newTask: {title: 'a new task', addingNew: false}
        }
    },
    computed: {
        disabled() {
            if (this.editing || this.newTask.addingNew ) {
                return true
            } 
        },
        inputStyle() {
            if (this.editing) {
                return {
                    paddingTop: '0.25em',
                    paddingBottom: '0.25em'
                }
            } 
        },
        todoCompleted() {
            if (_.every(this.todo.task, ['complete', true]) &&
               this.todo.task.length > 0 ) {
                return true
            } else { return false }
        },
        newTodo() {
            if (!this.todo.id) {
                return true 
            } else { return false }
        }
    },
    watch: {
      todoCompleted() {
          if (_.every(this.todo.task, ['complete', true]) &&
               this.todo.task.length > 0 ) {
                var completed = true
            } else { var completed = false }
          let data = { 
              id: this.todo.id, 
              complete: this.todoCompleted
          };
          this.$store.dispatch('toggleTodo', data)
      }  
    },
    methods: {
        editTodo() {
            this.editing = true;
        },
        saveTodoTitle() {
            let data = {title: this.$refs.title.value, id: this.todo.id}
            this.editing = false;
            this.$store.dispatch("updateTodoTitle", data)
        },
        clickDelete() {
          if (!this.disabled) {
              this.deleting=true
          }  
        },
        deleteThisTodo() {
            this.$store.dispatch("deleteTodo", this.todo.id);
            this.deleting = false
        },
        addTask() {
            this.newTask.addingNew = true
        },
        saveNewTask(data) {
            this.$store.dispatch('addNewTask', data)
        },
        discardNewTask() {
            this.newTask.addingNew = false
        },
        saveNewTodo() {
            let data = {
                title: this.$refs.title.value,
                created: new Date().toISOString()
            };
            this.$store.dispatch("addNewTodo", data)
        },
        discardNewTodo() {
            this.$store.state.newTodo.addingNew = false
        }
    },
    components: {
        'AppTask': AppTask
    }
}
</script>

<style scoped>
.finished {
    text-decoration: line-through;
}
.todo-completed {
    height: 3em; 
}
</style>
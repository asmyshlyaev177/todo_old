<template>
    <div class="content"> 
      <div class="card level columns is-mobile is-gapless" ref="taskContainer">
          <div class="column is-1 has-text-left">
            <span v-if="task.complete" class="icon"><i class="icon-checkmark"></i></span>
          </div>
          <div v-if="!deleting && !editing" @click="toggleTask" class="column has-text-centered task">
              {{ task.title }}
          </div>
        <!-- delete confirmation message -->
          <div v-if="deleting" @click="toggleTask" class="column has-text-centered task">
              <b>Delete task?</b>
          </div>
          <div v-if="editing" class="card-header-title" :style="inputStyle">
        <!-- input for edit task -->
            <input ref="taskTitle" v-focus class="input" v-bind:value="task.title" type="text" placeholder="New task">
          </div>
          
          <div class="column is-1 has-text-right" style="height: 4em;">
        <!-- edit task button-->
              <a v-if="!editing && !deleting && !task.addingNew" @click="edit"><span class="icon is-medium"><i class="icon-pencil"></i></span></a>
        <!-- save task button -->
              <a v-if="editing && !deleting && !task.addingNew" @click="saveTask"><span class="icon is-medium" style="height: 4em;"><i class="icon-checkmark"></i></span></a>
        <!-- delete task button -->
              <a v-if="!deleting && !editing && !task.addingNew" @click="clickDelete"><span class="icon is-medium"><i class="icon-bin"></i></span></a>
        <!-- confirm delete task button -->
              <a v-if="deleting && !task.addingNew" @click="deleteTask"><span class="icon is-medium"><i class="icon-checkmark"></i></span></a>
        <!-- cancel delete button -->
              <a v-if="deleting && !task.addingNew" @click="deleting = false"><span class="icon is-medium"><i class="icon-cross"></i></span></a>
              
        <!-- buttons for new task -->
              <a v-if="task.addingNew" @click="saveNewTask"><span class="icon is-medium"><i class="icon-checkmark"></i></span></a>
              <a v-if="task.addingNew" @click="discardNewTask"><span class="icon is-medium"><i class="icon-cross"></i></span></a>
              
          </div>
      </div>
    </div>
</template>

<script>
import { todoTaskMixin } from './Mixins';

export default {
    props: ['task'],
    mixins: [todoTaskMixin],
    created() {
      if (this.task.addingNew) {
          this.editing = true
      }
    },
    methods: {
        toggleTask() {
            if (!this.editing && !this.deleting) {
               let data = {taskid: this.task.id, todoid: this.task.todo, completed: !this.task.complete};
                this.$store.dispatch('toggleTask', data) 
            } 
        },
        saveTask() {
            let data = { 
                id: this.task.id, 
                todo: this.task.todo,
                title: this.$refs.taskTitle.value
            };
            this.$store.dispatch('updateTaskTitle', data);
            this.editing = false
        },
        clickDelete() {
            let taskHeight = this.$refs.taskContainer.offsetHeight;
            this.$refs.taskContainer.style.height = taskHeight + 'px'
            this.deleting = true
        },
        deleteTask() {
            let data = { id: this.task.id, todo: this.task.todo };
            this.$store.dispatch('deleteTask', data);
            this.deleting = false
        },
        saveNewTask() {
            let data = { 
                todo: this.$parent.todo.id,
                title: this.$refs.taskTitle.value,
                created: new Date().toISOString()
            };
            this.editing = false;
            this.$emit('saveNewTask', data)
        },
        discardNewTask() {
            this.$emit('discardNewTask')
        }
    },
    watch: {
        deleting() {
            if (!this.deleting) {
                this.$refs.taskContainer.style.height = 'auto'
            }
        }
    }
}
</script>

<style scoped>
    .task {
        cursor: pointer;
    }
</style>
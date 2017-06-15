// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import _ from 'lodash';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Sortable from 'sortablejs'
Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(VueRouter);
import bus from './components/bus';
    
var host = '192.168.1.70:8080';

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

Vue.directive('sort', {
  inserted: function (el, binding) {
    var sortable = new Sortable(el, {
        onUpdate(ev) {
            var tasklist = _.clone(binding.value);
            let data = {tasklist: tasklist, todoid: binding.value[0].todo, 
                    oldIndex: ev.oldIndex, newIndex: ev.newIndex};
            store.dispatch('updateTaskOrder', data) 
        },
        animation: 150
    });
  }
})

const store = new Vuex.Store({
  state: {
    fetching: false,
    newTodo: {title: 'A New Todo', addingNew: false, task: []},
    todolist: []
  },
  actions: 
    {
      fetchAllTodo(context) {
          store.state.fetching = true;
          Vue.http.get('http://'+host+'/todolist/')
            .then(response => {
                store.commit('FetchAllTodo', response.body)
            }, response => { //error
                console.log(response)
            });
      },
      updateTaskOrder(context, data) {
          var oldEl = data.tasklist[data.oldIndex];
          data.tasklist.splice(data.oldIndex, 1);
          data.tasklist.splice(data.newIndex, 0, oldEl);
          data.tasklist.forEach(function(currentValue, index, array) {
	            data.tasklist[index].order = index;
          });
          Vue.http.patch('http://'+host+'/todo/'+data.todoid, {task: data.tasklist} )
            .then(response => {
                store.commit('UpdateTaskOrder', {tasklist: response.body,
                                                 todoid: data.todoid})
            }, response => { //error
                console.log(response)
            });
      },
      addNewTask(context, data) {
          Vue.http.post('http://'+host+'/tasklist/', data)
            .then(response => {
                store.commit('CreateNewTask', response.body)
            }, response => { //error
                console.log(response)
            });
      },
      addNewTodo(context, data) {
          Vue.http.post('http://'+host+'/todolist/', data)
            .then(response => {
                store.commit('CreateNewTodo', response.body)
            }, response => { //error
                console.log(response)
            });
      },
      toggleTask(context, data) { 
          //data = {taskid: 0, todoid: 0, completed: true}
          let payload = { complete: data.completed }
          if (data.completed) {
              payload['completed'] = new Date().toISOString()
          }
          Vue.http.patch('http://'+host+'/task/'+data.taskid, payload)
            .then(response => {
              store.commit('UpdateTask', response.body)
          }, response => {
              console.log(response)
          })
      },
      deleteTask(context, data) {
          Vue.http.delete('http://'+host+'/task/'+data.id)
            .then(response => {
              store.commit('DeleteTask', data)
          }, response => {
              console.log(response)
          })
      },
      toggleTodo(context, data) {
          if(data.complete) {
              data['completed'] = new Date().toISOString()
          }
          Vue.http.patch('http://'+host+'/todo/'+data.id, data)
            .then(response => {
              store.commit('UpdateTodo', response.body)
          }, response => {
              console.log(response)
          })
      },
      updateTaskTitle(context, data) {
         Vue.http.patch('http://'+host+'/task/'+data.id, data)
            .then(response => {
              store.commit('UpdateTask', response.body)
          }, response => {
              console.log(response)
          }) 
      },
      updateTodoTitle(context, data) {
          Vue.http.patch('http://'+host+'/todo/'+data.id, data)
            .then(response => {
              store.commit('UpdateTodo', response.body)
          }, response => {
              console.log(response)
          })
      },
      deleteTodo(context, id) {
          Vue.http.delete('http://'+host+'/todo/'+id)
            .then(response => {
              store.commit('DeleteTodo', id)
          }, response => {
              console.log(response)
          })
      }
  },
  mutations: {
    FetchAllTodo(state, data) {
        state.todolist = data;
        store.state.fetching = false
    },
    UpdateTaskOrder(state, data) {
        let todoIndex = _.findKey(state.todolist, ['id', data.todoid]);
        let taskCount = state.todolist[todoIndex].task.length;
        
        console.log(data)
        state.todolist[todoIndex].task.splice(0, taskCount, ...data.tasklist.task);
    },
    CreateNewTodo(state, data) {
        state.newTodo.addingNew = false;
        state.todolist.push(data);
    },
    UpdateTodo(state, data) {
        let todoIndex = _.findKey(state.todolist, ['id', data.id]);
        state.todolist.splice(todoIndex, 1, data);
    },
    CreateNewTask(state, data) {
        let todoIndex = _.findKey(state.todolist, ['id', data.todo]);
        bus.$emit('new-task', data.todo);
        state.todolist[todoIndex].task.push(data);
    },
    UpdateTask(state, data) { 
        let todoIndex = _.findKey(state.todolist, ['id', data.todo]);
        let taskIndex = _.findKey(state.todolist[todoIndex].task, ['id', data.id])
        let newTask = data;
        state.todolist[todoIndex].task.splice(taskIndex, 1, newTask)
    },
    DeleteTodo(state, id) {
        let todoIndex = _.findKey(state.todolist, ['id', id]);
        let newTodolist = state.todolist.splice(todoIndex, 1)
    },
    DeleteTask(state, data){
        let todoIndex = _.findKey(state.todolist, ['id', data.todo]);
        let taskIndex = _.findKey(state.todolist[todoIndex].task, ['id', data.id])
        state.todolist[todoIndex].task.splice(taskIndex, 1)
    }
    
  }
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

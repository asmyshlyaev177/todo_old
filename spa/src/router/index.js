import Vue from 'vue';
import Router from 'vue-router';
import Todolist from '../components/Todolist';
Vue.use(Router);

export default new Router({
    mode: 'history',
    linkActiveClass: 'is-active',
    routes: [
    {
        path: '/',
        name: 'root',
        component: Todolist,
        props: { activeMenu: 'all' }
    },
    {
        path: '/pending',
        name: 'pending',
        component: Todolist,
        props: { activeMenu: 'pending' }
    },
    {
        path: '/completed',
        name: 'completed',
        component: Todolist,
        props: { activeMenu: 'completed' }
    }
  ]
})

'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _34783116 = () => import('/root/todo/todo/spa/src/pages/index.vue' /* webpackChunkName: "pages/index" */)

const _c90bac06 = () => import('/root/todo/todo/spa/src/pages/pending/index.vue' /* webpackChunkName: "pages/pending" */)

const _8372221e = () => import('/root/todo/todo/spa/src/pages/completed/index.vue' /* webpackChunkName: "pages/completed" */)



const scrollBehavior = (to, from, savedPosition) => {
  // savedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // if no children detected
    if (to.matched.length < 2) {
      // scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // if one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // if link has anchor,  scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
  		{
			path: "/",
			component: _34783116,
			name: "index"
		},
		{
			path: "/pending",
			component: _c90bac06,
			name: "pending"
		},
		{
			path: "/completed",
			component: _8372221e,
			name: "completed"
		}
    ]
  })
}

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Vue.js Todo App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Vue.js, vuex, vue-router and Nuxt.js by https://github.com/asmyshlyaev177' }
    ]
  },
  srcDir: 'src/',
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  router: {
      linkActiveClass: 'is-active'
  }
}

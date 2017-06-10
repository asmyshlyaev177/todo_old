<template>
  <div id="app">
    
  <section class="is-success is-bold hero">
  <div class="hero-body">
    <div class="container">
      <h1 class=" title has-text-centered">
        Todo App
      </h1>
      <h2 class="subtitle has-text-centered">
        Made with Vue.js and bulma.io
      </h2>
    </div>
  </div>
  </section>    
      
<div class="tabs is-centered is-medium">
  <ul>
    <li>
        <a>
         <span class="icon"><i class="fa fa-plus"></i></span><span>Add todo</span>
        </a>
    </li>
    <li>
        <a>
            <span class="icon"><i class="fa fa-spin fa-spinner "></i></span><span>Pending todo</span>
        </a>
    </li>
    <li class="is-active">
        <a>
            <span class="icon"><i class="fa fa-list-ul"></i></span><span>All todo</span>
        </a>
    </li>
    <li>
        <a>
            <span class="icon"><i class="fa fa-check"></i></span><span>Completed</span>
        </a>
    </li>
  </ul>
</div>
      

<section>
<div class="container">
<div class="columns">
    

<div class="column is-6">
<div class="card">
  <header class="card-header">
    <p class="card-header-title">
      Component
    </p>
    <a class="card-header-icon">
      <span class="icon">
        <i class="fa fa-pencil"></i>
      </span>
    </a>
  </header>
  <div class="card-content">
    <div class="content">
        
      <div class="card level">
          <div class="is-pulled-left">
              <span class="icon"><i class="fa fa-check fa-lg"></i></span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
          </div>
          <div class="is-pulled-right">
              <a><span class="icon"><i class="fa fa-pencil"></i></span></a>
              <a><span class="icon"><i class="fa fa-trash-o"></i></span></a>
          </div>
      </div>
        
      <div class="card level">
          <div class="is-pulled-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
          </div>
          <div class="is-pulled-right">
              <a><span class="icon"><i class="fa fa-pencil"></i></span></a>
              <a><span class="icon"><i class="fa fa-trash-o"></i></span></a>
          </div>
      </div>
        
      <br>
    </div>
  </div>
  <footer class="card-footer">
      <a class="card-footer-item">
          <span class="icon"><i class="fa fa-trash-o"></i></span>
              <span>Delete</span>
      </a>
  </footer>
</div>
</div>
    

<div class="column is-6">
<div class="card">
  <header class="card-header">
    <p class="card-header-title">
      Component
    </p>
    <a class="card-header-icon">
      <span class="icon">
        <i class="fa fa-pencil"></i>
      </span>
    </a>
  </header>
  <div class="card-content">
    <div class="content">
        
      <div class="card level">
          <div class="is-pulled-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
          </div>
          <div class="is-pulled-right">
              <a><span class="icon"><i class="fa fa-pencil"></i></span></a>
              <a><span class="icon"><i class="fa fa-trash-o"></i></span></a>
          </div>
      </div>
        
      <div class="card level">
          <div class="is-pulled-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
          </div>
          <div class="is-pulled-right">
              <a><span class="icon"><i class="fa fa-pencil"></i></span></a>
              <a><span class="icon"><i class="fa fa-trash-o"></i></span></a>
          </div>
      </div>
        
      <br>
    </div>
  </div>
  <footer class="card-footer">
      <a class="card-footer-item">
          <span class="icon"><i class="fa fa-trash-o"></i></span>
              <span>Delete</span>
      </a>
  </footer>
</div>
</div>
    

</div>
</div>
</section>
      
      
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
@import '~bulma/css/bulma.css';
}
</style>

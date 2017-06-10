<template>
<div class="column is-6-desktop is-12-tablet">
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
    <a class="card-header-icon">
      <span class="icon">
        <i class="fa fa-check"></i>
      </span>
    </a>
  </header>
    
  <div class="card-content">
      
<AppTask></AppTask>
<AppTask></AppTask>
<AppTask></AppTask>
        
      
  </div>
    
  <footer class="card-footer">
      <a class="card-footer-item">
          <span class="icon"><i class="fa fa-trash-o"></i></span>
              <span>Delete</span>
      </a>
      <a class="card-footer-item">
          <span class="icon"><i class="fa fa-check"></i></span>
              <span>Sure!</span>
      </a>
  </footer>
</div>
</div>
</template>

<script>
import AppTask from './Task';
export default {
    components: {
        'AppTask': AppTask
    }
}
</script>
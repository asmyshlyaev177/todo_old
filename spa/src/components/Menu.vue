<template>
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
</template>

<script>
export default {
    
}
</script>
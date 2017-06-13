<template>

<p class="field has-text-centered menu">
    <a class="button is-primary is-focused is-medium" 
       v-on:click="addNewTodo">
        <span class="icon"><i class="icon-plus"></i></span>
        <span>Add Todo</span>
    </a>
    <nuxt-link to="/pending" class="button is-info is-focused is-medium" 
       v-on:click="clickMenu('pending')">
        <span class="icon"><i :class="{ 'rotating': pending }" class="icon-spinner"></i></span>
        <span>Pending todo</span>
    </nuxt-link>
    <nuxt-link to="/" class="button is-focused is-medium" 
       v-on:click="clickMenu('all')">
        <span class="icon"><i class="icon-list"></i></span>
        <span>All todo</span>
    </nuxt-link>
    <nuxt-link to="/completed" class="button is-success is-focused is-medium" 
       v-on:click="clickMenu('completed')">
        <span class="icon"><i class="icon-checkmark"></i></span>
        <span>Completed</span>
    </nuxt-link>
</p>

    
</template>

<script>
export default {
    computed: {
        pending() {
            if (this.$route.name == 'pending') {
                return true
            }
        }
    },
    methods: {
        clickMenu(val) {
            this.$emit('changeMenu', val)
        },
        addNewTodo(){
            this.$store.state.newTodo.addingNew = true
        }
    }
}
</script>

<style scoped>
@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;
}
    
    .menu {
        margin: 1.5em;
    }
    .button {
        margin: 0.2em 0.2em 0.2em 0.2em;
    }
</style>
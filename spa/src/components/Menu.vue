<template>

<p class="field has-text-centered menu">
    <a class="button is-primary is-focused is-medium" 
       v-on:click="addNewTodo">
        <span class="icon"><i class="fa fa-plus"></i></span>
        <span>Add Todo</span>
    </a>
    <router-link to="/pending" class="button is-info is-focused is-medium" 
       v-on:click="clickMenu('pending')">
        <span class="icon"><i :class="{ 'fa-spin': pending }" class="fa fa-spinner "></i></span>
        <span>Pending todo</span>
    </router-link>
    <router-link to="/" class="button is-focused is-medium" 
       v-on:click="clickMenu('all')">
        <span class="icon"><i class="fa fa-list-ul"></i></span>
        <span>All todo</span>
    </router-link>
    <router-link to="/completed" class="button is-success is-focused is-medium" 
       v-on:click="clickMenu('completed')">
        <span class="icon"><i class="fa fa-check"></i></span>
        <span>Completed</span>
    </router-link>
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
    .menu {
        margin: 1.5em;
    }
    .button {
        margin: 0.2em 0.2em 0.2em 0.2em;
    }
</style>
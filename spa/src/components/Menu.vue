<template>

<p class="field has-text-centered menu">
    <a class="button is-primary is-focused is-medium" 
       v-on:click="addNewTodo">
        <span class="icon"><i class="fa fa-plus"></i></span>
        <span>Add Todo</span>
    </a>
    <a class="button is-info is-focused is-medium" 
       v-on:click="clickMenu('pending')" :class="{ 'is-active': pending }">
        <span class="icon"><i :class="{ 'fa-spin': pending }"  class="fa fa-spinner "></i></span>
        <span>Pending todo</span>
    </a>
    <a class="button is-focused is-medium" 
       v-on:click="clickMenu('all')" :class="{ 'is-active': all }">
        <span class="icon"><i class="fa fa-list-ul"></i></span>
        <span>All todo</span>
    </a>
    <a class="button is-success is-focused is-medium" 
       v-on:click="clickMenu('completed')" :class="{ 'is-active': completed }">
        <span class="icon"><i class="fa fa-check"></i></span>
        <span>Completed</span>
    </a>
</p>

    
</template>

<script>
export default {
    props: ['active'],
    computed: {
        all() {
            if (this.active == 'all') {
                return  true
            }
        },
        pending() {
            if (this.active == 'pending') {
                return true
            }
        },
        completed() {
            if (this.active == 'completed') {
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
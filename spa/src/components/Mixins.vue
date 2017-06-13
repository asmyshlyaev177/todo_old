<script>
 let todoTaskMixin = {
    data() {
        return {
            editing: false,
            deleting: false
        }
    },
    computed: {
        inputStyle() {
            if (this.editing) {
                return {
                    paddingTop: '0.25em',
                    paddingBottom: '0.25em'
                }
            } 
        }
    },
    methods: {
        edit() {
            this.editing = true;
        }
    }
}
    
export { todoTaskMixin }
</script>
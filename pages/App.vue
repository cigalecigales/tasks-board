<template lang="pug">
    div.container
        HeaderMenu
        div(v-for="board in this.$store.state.boards")
            TaskList(:board="board")
        AddKanban(v-if="this.$store.state.add_kanban.modal")
        KanbanDetails(v-if="this.$store.state.kanban_details.modal")
</template>


<script>
import TaskList from '~/components/TaskList.vue'
import HeaderMenu from '~/components/HeaderMenu.vue'
import AddKanban from '~/components/AddKanban.vue'
import KanbanDetails from '~/components/KanbanDetails.vue'

export default {
    name: 'App',
    components: {
        HeaderMenu, TaskList, AddKanban, KanbanDetails
    }
}
</script>


<style lang="scss" scoped>

</style>
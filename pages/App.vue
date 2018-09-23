<template lang="pug">
    div.container.plane
        HeaderMenu
        div.tasksContainer
            div.tasks
                div.task(v-for="board in this.$store.state.boards")
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
.tasksContainer {
    width: 100%;
    overflow-x: scroll;
    height: calc(100% - 40px);
}

.tasks {
    display: inline-block;
    white-space: nowrap;
    height: 100%;
}

.task {
    display: inline-block;
    height: 100%;
}
</style>
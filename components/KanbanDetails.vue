<template lang="pug">
  div
    transition(name="modalKanbanDetails")
      div.commonModalMask
        div.commonModalWrapper
          div.commonModalContainer
            table
              tr
                td
                  label task name
                td
                  input.commonInput.taskName(placeholder="task name", v-model="taskName", required)
              tr
                td
                  label limit
                td
                  input.commonInput.year(placeholder="year", type="number", v-model="limit.year", min="4", max="4")
                  input.commonInput.month(placeholder="month", type="number", v-model="limit.month")
                  input.commonInput.day(placeholder="day", type="number", v-model="limit.day")
                  input.commonInput.hour(placeholder="hour", type="number", v-model="limit.hour")
                  input.commonInput.minutes(placeholder="minutes", type="number", v-model="limit.minutes")
              tr
                td
                  label description
                td
                  textarea.commonInput.description(placeholder="description", v-model="description")
            div.commonButtonArea
              button.commonButton(@click="close") close
              button.commonButton(@click="deleteInfo") delete
              button.commonButton(@click="update") update
</template>


<script>
import * as Type from "~/store/mutation-types"

export default {
  name: 'KanbanDetails',
  data() {
    return {
      taskName: this.$store.state.kanban_details.targetKanban.title,
      limit: {
        year: this.$store.state.kanban_details.targetKanban.limit.getFullYear(),
        month: this.$store.state.kanban_details.targetKanban.limit.getMonth() + 1,
        day: this.$store.state.kanban_details.targetKanban.limit.getDate(),
        hour: this.$store.state.kanban_details.targetKanban.limit.getHours(),
        minutes: this.$store.state.kanban_details.targetKanban.limit.getMinutes(),
      },
      description: this.$store.state.kanban_details.targetKanban.description,
    }
  },
  methods: {
    /**
     * タスク更新処理
     */
    update() {
      const data = {
        taskName: this.$data.taskName,
        limit: new Date(this.$data.limit.year, this.$data.limit.month - 1, this.$data.limit.day, this.$data.limit.hour, this.$data.limit.minutes, 0),
        description: this.$data.description,
      }

      this.$store.commit(Type.UPDATE_KANBAN, data)
      this.$store.commit(Type.CLOSE_KANBAN_DETAILS_MODAL)
    },
    /**
     * タスク削除処理
     */
    deleteInfo() {
      this.$store.commit(Type.DELETE_KANBAN)
      this.$store.commit(Type.CLOSE_KANBAN_DETAILS_MODAL)
    },
    /**
     * モーダルクローズ処理
     */
    close() {
      this.$store.commit(Type.CLOSE_KANBAN_DETAILS_MODAL)
    },
  }
}
</script>


<style lang="scss" scoped>
.commonModalContainer {
  width: 500px;

  .taskName {
    width: 100%;
  }

  .year {
    width: 55px;
  }

  .month {
    width: 55px;
  }

  .day {
    width: 55px;
  }

  .hour {
    width: 55px;
  }

  .minutes {
    width: 55px;
  }

  .description {
    width: 100%;
  }
}
</style>
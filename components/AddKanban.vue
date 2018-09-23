<template lang="pug">
  div
    transition(name="modalAddKanban")
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
              button.commonButton(@click="add") add
              
</template>


<script>
import * as Type from '~/store/mutation-types'

export default {
  name: 'AddKanban',
  data() {
    return {
      taskName: '',
      limit: {
        year: null,
        month: null,
        day: null,
        hour: null,
        minutes: null,
      },
      description: '',
    }
  },
  created() {
    const now = new Date()
    this.$data.limit = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate() + 1,
      hour: 12,
      minutes: 0
    }
  },
  methods: {
    /**
     * タスク追加処理
     */
    add() {
      if (!this.$data.taskName) {
        return
      }
      const data = {
        taskName: this.$data.taskName,
        limit: new Date(
          this.$data.limit.year, 
          this.$data.limit.month - 1, 
          this.$data.limit.day, 
          this.$data.limit.hour, 
          this.$data.limit.minutes, 
          0
        ),
        description: this.$data.description,
      }
      this.$store.commit(Type.ADD_NEW_KANBAN, data)
      this.$store.commit(Type.CLOSE_KANBAN_ADDING_MODAL)
    },
    /**
     * モーダルクローズ処理
     */
    close() {
      this.$store.commit(Type.CLOSE_KANBAN_ADDING_MODAL)
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
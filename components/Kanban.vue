<template lang="pug">
    div.container(draggable="true", 
                  @dragstart="dragstart(this, $event)"
                  @dragend="dragend",
                  @dragenter="dragenter(this)",
                  @click="openDetails")
        div.title {{title}}
        div.alert
          div.alertType1(v-if="this.alertType === 1") ●
          div.alertType2(v-else-if="this.alertType === 2") ●
</template>


<script>
import * as Type from "~/store/mutation-types";

export default {
  name: "Kanban",
  props: ["boardId", "kanbanId", "title", "limit", "alertType"],
  data() {
    return {};
  },
  methods: {
    dragstart(item, event) {
      // 色を半透明に
      event.target.style.opacity = 0.5;
      // 送信元IDをドラッグ先に送る
      event.dataTransfer.setData("fromBoardId", this.boardId);
      event.dataTransfer.setData("fromItemId", this.kanbanId);
    },
    dragend(event) {
      // 色をもとに戻す
      event.target.style.opacity = 1;
    },
    dragenter(item) {},
    /**
     * 詳細モーダル表示処理
     */
    openDetails() {
      const data = {
        targetBoardId: this.boardId,
        targetKanban: {
          id: this.kanbanId,
          title: this.title,
          limit: new Date(this.limit),
          alertType: this.alertType
        },
      }
      this.$store.commit(Type.SHOW_KANBAN_DETAILS_MODAL, data)
    },
  },
  computed: {
    // alert() {
    // }
  }
};
</script>


<style lang="scss" scoped>
.container {
  background: #ffffff;
  padding: 10px;
  width: calc(100% - 10px);
  min-width: calc(100% - 10px);
  max-width: calc(100% - 10px);
  min-height: initial;
  height: initial;

  &:hover {
    background: #f7f7f7;
    cursor: pointer;
  }
}

.alert {
  position: relative;

  .alertType1 {
    position: absolute;
    top: -20px;
    right: 0px;
    color: #e2df1f;
  }

  .alertType2 {
    position: absolute;
    top: -20px;
    right: 0px;
    color: #e21f50;
  }
}
</style>



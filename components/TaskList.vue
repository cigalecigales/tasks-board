<template lang="pug">
  div.container
    div.title {{board.name}}
      span.add(@click="showModal", title="add task") +
      span.sort(@click="sortByLimitDesc", title="sort by limit desc") ▼
    div.kanbans(dropzone="move", @dragover="dragover($event)", @drop="drop($event)")
      div(v-for="kanban in board.kanbans")
        Kanban(:boardId="board.id", 
               :kanbanId="kanban.id", 
               :title="kanban.title", 
               :limit="kanban.limit",
               :alertType="kanban.alertType")
</template>


<script>
import Kanban from "~/components/Kanban.vue"
import * as Type from "~/store/mutation-types"

export default {
  name: 'TaskList',
  props: ['board'],
  data() {
    return {};
  },
  methods: {
    /**
     * ドラッグオーバー時処理
     */
    dragover(event) {
      event.preventDefault();
    },
    /**
     * ドロップ時処理
     */
    drop(event) {
      // 送信元ボードIDを取得
      const fromBoardId = Number(event.dataTransfer.getData("fromBoardId"));
      // 送信元カンバンIDを取得
      const fromItemId = Number(event.dataTransfer.getData("fromItemId"));
      // 送信先ボードIDを取得
      const toBoardId = this.board.id;

      // 更新データの作成
      const data = {
        fromBoardId: fromBoardId,
        fromItemId: fromItemId,
        toBoardId: toBoardId
      };

      this.$store.commit(Type.MOVE_KANBEN_TO_OTHER_BOARD, data);
      event.preventDefault();
    },
    /**
     * モーダル展開処理
     */
    showModal() {
      this.$store.commit(Type.SHOW_KANBAN_ADDING_MODAL, this.board.id)
    },
    /**
     * ソート処理（期限　降順）
     */
    sortByLimitDesc() {
      this.$store.commit(Type.SORT_KANBAN_BY_LIMIT_DESC, this.board.id)
    },
  },
  components: {
    Kanban
  }
};
</script>


<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  min-height: calc(100% - 10px);
  height: calc(100% - 10px);
  border-radius: 5px;
  width: 25%;
  max-width: 320px;
  min-width: 320px;
  background: #e4e4e4;
  margin: 5px;
  border: 1px solid #d8d8d8;
  display: inline-block;

  .title {
    background: #d6d6d6;
    padding: 5px 10px;

    .add {
      display: block;
      background: #bebebe;
      width: 20px;
      height: 20px;
      line-height: 17px;
      border-radius: 50%;
      text-align: center;
      border: 1px solid #d3d3d3;
      box-sizing: border-box;
      float: right;

      &:hover {
        background: #adadad;
        cursor: pointer;
      }
    }

    .sort {
      display: block;
      background: #bebebe;
      width: 20px;
      height: 20px;
      line-height: 17px;
      border-radius: 50%;
      text-align: center;
      border: 1px solid #d3d3d3;
      box-sizing: border-box;
      float: right;

      &:hover {
        background: #adadad;
        cursor: pointer;
      }
    }
  }

  .kanbans {
    height: calc(100% - 35px);
    overflow-y: auto;
  }
}
</style>


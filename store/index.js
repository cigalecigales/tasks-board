import Vuex from 'vuex'
import * as Type from '~/store/mutation-types'
import * as Init from '~/store/init_data'
import PersistedState from '~/plugins/persistedstate'

const store = () => new Vuex.Store({
    state: {
        add_kanban: {
            modal: false,
            targetBoardId: null,
        },
        kanban_details: {
            modal: false,
            targetBoardId: null,
            targetKanban: null,
        },
        boards: [
            {
                id: 1,
                name: 'TODO',
                kanbans: [],
            },
            {
                id: 2,
                name: 'DOING',
                kanbans: [],
            },
            {
                id: 3,
                name: 'DONE',
                kanbans: [],
            },
        ],
    },
    getters: {

    },
    mutations: {
        /**
         * 初期処理
         */
        [Type.INIT_DATA](state, data) {
            let initData = Init.initData
            if (!!data) {
                initData.boards = data.boards
            }
            state.boards = initData.boards
        },

        /**
         * カンバンのボード間の移動
         */
        [Type.MOVE_KANBEN_TO_OTHER_BOARD](state, data) {
            // 移動前のボードデータを取得
            let fromBoard = state.boards.filter(board => (board.id === data.fromBoardId))
            // 移動前のボードデータから今回移動するカンバンデータを取得
            const newToItem = fromBoard[0].kanbans.filter(kanban => (kanban.id === data.fromItemId))
            // 移動前ボードデータがある場合
            if (!!fromBoard.length) {
                // 移動前ボードのカンバンデータから今回移動するデータを除いたリストを構築
                const newFromBoardList = fromBoard[0].kanbans.filter(kanban => (kanban.id !== data.fromItemId))
                // カンバンデータの更新
                fromBoard[0].kanbans = newFromBoardList
            }

            // 移動後のボードデータを取得
            let toBoard = state.boards.filter(board => (board.id === data.toBoardId))
            // 移動後のボードデータがある場合
            if (!!toBoard.length) {
                // 移動前のボードデータから今回追加するデータがある場合
                if (!!newToItem.length) {
                    // データ追加
                    toBoard[0].kanbans.push({
                        id: toBoard[0].kanbans.length + 1,
                        title: newToItem[0].title,
                        limit: newToItem[0].limit,
                        alertType: newToItem[0].alertType,
                        description: newToItem[0].description,
                    })
                }
            }
        },

        /**
         * カンバン追加モーダル表示
         */
        [Type.SHOW_KANBAN_ADDING_MODAL](state, targetBoardId) {
            state.add_kanban.modal = true
            state.add_kanban.targetBoardId = targetBoardId
        },

        /**
         * カンバン追加モーダルクローズ
         */
        [Type.CLOSE_KANBAN_ADDING_MODAL](state) {
            state.add_kanban.modal = false
            state.add_kanban.targetBoardId = null
        },

        /**
         * 新規カンバン追加
         */
        [Type.ADD_NEW_KANBAN](state, data) {
            // タスク追加先のボードデータを取得
            let targetBoard = state.boards.filter(board => (board.id === state.add_kanban.targetBoardId))
            if (!!targetBoard.length) {
                // タスク追加
                targetBoard[0].kanbans.push({
                    id: targetBoard[0].kanbans.length + 1,
                    title: data.taskName,
                    limit: data.limit,
                    alertType: Type.checkAlertType(data.limit),
                    description: data.description,
                })
            }
        },

        /**
         * カンバン詳細モーダル表示
         */
        [Type.SHOW_KANBAN_DETAILS_MODAL](state, data) {
            state.kanban_details.modal = true
            state.kanban_details.targetBoardId = data.targetBoardId
            state.kanban_details.targetKanban = data.targetKanban
        },

        /**
         * カンバン追加モーダルクローズ
         */
        [Type.CLOSE_KANBAN_DETAILS_MODAL](state) {
            state.kanban_details.modal = false
            state.kanban_details.targetBoardId = null
            state.kanban_details.targetKanban = null
        },

        /**
         * カンバン情報更新
         */
        [Type.UPDATE_KANBAN](state, data) {
            // タスク更新先のボードデータを取得
            let targetBoard = state.boards.filter(board => (board.id === state.kanban_details.targetBoardId))
            if (!!targetBoard.length) {
                // データ更新
                targetBoard[0].kanbans.forEach((value) => {
                    if (value.id === state.kanban_details.targetKanban.id) {
                        value.title = data.taskName
                        value.limit = data.limit
                        value.alertType = Type.checkAlertType(data.limit)
                        value.description = data.description
                        return
                    }
                })
            }
        },

        /**
         * カンバン削除
         */
        [Type.DELETE_KANBAN](state) {
            // タスク削除先のボードデータを取得
            let targetBoard = state.boards.filter(board => (board.id === state.kanban_details.targetBoardId))
            if (!!targetBoard.length) {
                // ボードのカンバンデータから今回削除するデータを除いたリストを構築
                const newFromBoardList = targetBoard[0].kanbans.filter(kanban => (kanban.id !== state.kanban_details.targetKanban.id))
                // カンバンデータの更新
                targetBoard[0].kanbans = newFromBoardList
            }
        },

        /**
         * カンバンソート（期限　降順）
         */
        [Type.SORT_KANBAN_BY_LIMIT_DESC](state, targetBoardId) {
            // ソート対象のボードデータを取得
            let targetBoard = state.boards.filter(board => (board.id === targetBoardId))
            if (!!targetBoard.length) {
                targetBoard[0].kanbans.sort((a, b) => {
                    return a.limit - b.limit
                    
                })
            }
        },

        /**
         * アラート更新
         */
        [Type.UPDATE_ALERT_TYPE](state) {
            state.boards.forEach((board) => {
                board.kanbans.forEach((kanban) => {
                    kanban.alertType = Type.checkAlertType(new Date(kanban.limit))
                })
            })
        }
    },

    
})

export default store